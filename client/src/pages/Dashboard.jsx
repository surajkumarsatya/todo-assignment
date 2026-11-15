import { useEffect, useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import CalendarSection from "../components/tasks/CalendarSection";
import WeeklyTaskSection from "../components/tasks/WeeklyTaskSection";
import TaskSearchScreen from "../components/tasks/TaskSearchScreen";
import TaskFormModal from "../components/tasks/TaskFormModal";
import TaskDetailsModal from "../components/tasks/TaskDetailsModal";
import { getTodayDate, parseDate, toDateKey, getLocalDateTime, getMonday, getCalendarDays, groupTasksByWeek, } from "../utils/dateUtils";
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask, } from "../services/taskService";

function Dashboard() {
  const [allTasks, setAllTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [expandedWeek, setExpandedWeek] = useState(
    toDateKey(getMonday(getTodayDate()))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: getTodayDate(),
    startTime: "",
    endTime: "",
    priority: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTasks();
        setAllTasks(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return allTasks;

    return allTasks.filter((task) => {
      const title = (task.title || "").toLowerCase();
      const description = (task.description || "").toLowerCase();

      return title.includes(query) || description.includes(query);
    });
  }, [allTasks, search]);

  const calendarDays = useMemo(
    () => getCalendarDays(selectedDate),
    [selectedDate]
  );

  const allWeeklyGroups = useMemo(
    () => groupTasksByWeek(allTasks),
    [allTasks]
  );

  const filteredTaskIds = useMemo(
    () => new Set(filteredTasks.map((task) => task._id)),
    [filteredTasks]
  );

  const weeklyGroups = useMemo(() => {
    return allWeeklyGroups
      .map((week) => ({
        ...week,
        visibleTasks: week.tasks.filter((task) =>
          filteredTaskIds.has(task._id)
        ),
      }))
      .filter(
        (week) =>
          !search.trim() || week.visibleTasks.length > 0
      );
  }, [allWeeklyGroups, filteredTaskIds, search]);

  const refreshTasks = async () => {
    const response = await getTasks();
    setAllTasks(response.data);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);

    const monday = getMonday(date);

    setExpandedWeek(toDateKey(monday));
  };

  const changeCalendarWeek = (direction) => {
    const date = parseDate(selectedDate);

    date.setDate(date.getDate() + direction * 7);

    setSelectedDate(toDateKey(date));
  };

  const handleWeekToggle = (week) => {
    setExpandedWeek(
      expandedWeek === week.key ? null : week.key
    );

    setSelectedDate(toDateKey(week.start));
  };

  const openCreateModal = () => {
    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      date: selectedDate,
      startTime: "",
      endTime: "",
      priority: "",
    });

    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    const startDateTime = getLocalDateTime(task.startAt);
    const endDateTime = getLocalDateTime(task.endAt);

    setEditingTask(task);

    setFormData({
      title: task.title,
      description: task.description || "",
      date: startDateTime.slice(0, 10),
      startTime: startDateTime.slice(11, 16),
      endTime: endDateTime.slice(11, 16),
      priority: task.priority || "",
    });

    setError("");
    setIsModalOpen(true);
  };

  const openViewModal = (task) => {
    setViewingTask(task);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) return;

    if (
      !formData.date ||
      !formData.startTime ||
      !formData.endTime
    ) {
      setError("Please enter the date and both times.");
      return;
    }

    const startAt = new Date(
      `${formData.date}T${formData.startTime}`
    );

    const endAt = new Date(
      `${formData.date}T${formData.endTime}`
    );

    if (
      Number.isNaN(startAt.getTime()) ||
      Number.isNaN(endAt.getTime()) ||
      endAt <= startAt
    ) {
      setError("End time must be after start time.");
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description,
      startAt: startAt.toISOString(),
      endAt: endAt.toISOString(),
    };

    if (formData.priority) {
      taskData.priority = formData.priority;
    }

    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);
      }

      setIsModalOpen(false);
      setEditingTask(null);

      const savedWeek = toDateKey(getMonday(formData.date));

      setSelectedDate(formData.date);
      setExpandedWeek(savedWeek);

      await refreshTasks();
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    const task = allTasks.find((item) => item._id === id);

    if (!task) return;

    const newStatus =
      task.status === "Completed"
        ? "In Progress"
        : "Completed";

    try {
      setError("");

      await updateTaskStatus(id, newStatus);
      await refreshTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");

      await deleteTask(id);
      await refreshTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchBack = () => {
    setIsSearchActive(false);
    setSearch("");
  };

  const handleToday = () => {
    const today = getTodayDate();

    setSelectedDate(today);
    setExpandedWeek(toDateKey(getMonday(today)));
  };

  return (
    <AppLayout>
      {!isSearchActive && (
        <>
          <Header />

          <div className="relative mb-5">
            <input
              type="search"
              value={search}
              onFocus={() => setIsSearchActive(true)}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for a task"
              className="h-11.5 w-full border border-border bg-white px-4 pr-12 text-xs text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
            />

            <Search
              size={19}
              strokeWidth={1.7}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground"
            />
          </div>

          <CalendarSection
            calendarDays={calendarDays}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onWeekChange={changeCalendarWeek}
            onToday={handleToday}
          />

          {error && !isModalOpen && (
            <p className="mb-4 text-xs text-red-500">
              {error}
            </p>
          )}

          <WeeklyTaskSection
            loading={loading}
            weeklyGroups={weeklyGroups}
            search={search}
            expandedWeek={expandedWeek}
            onWeekToggle={handleWeekToggle}
            onToggle={handleToggle}
            onView={openViewModal}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />

          <button
            type="button"
            onClick={openCreateModal}
            aria-label="Add new task"
            className="fixed bottom-7 left-1/2 flex h-14.5 w-14.5 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl active:scale-95 md:bottom-10 md:left-auto md:right-12 md:translate-x-0"
          >
            <Plus size={27} strokeWidth={1.6} />
          </button>
        </>
      )}

      {isSearchActive && (
        <TaskSearchScreen
          search={search}
          setSearch={setSearch}
          onBack={handleSearchBack}
          error={error}
          filteredTasks={filteredTasks}
          onToggle={handleToggle}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      <TaskFormModal
        isOpen={isModalOpen}
        editingTask={editingTask}
        formData={formData}
        setFormData={setFormData}
        error={error}
        saving={saving}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />

      <TaskDetailsModal
        viewingTask={viewingTask}
        onClose={() => setViewingTask(null)}
      />
    </AppLayout>
  );
}

export default Dashboard;
