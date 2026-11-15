import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

import TaskList from "./TaskList";
import { formatDate } from "../../utils/dateUtils";

function WeeklyTaskSection({ loading, weeklyGroups, search, expandedWeek, onWeekToggle, onToggle, onView, onEdit, onDelete }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">
          Weekly Tasks
        </h2>

        <p className="mt-1 text-xs text-muted">
          Your tasks organized from Monday to Sunday
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted">
            Loading tasks...
          </p>
        </div>
      ) : weeklyGroups.length === 0 ? (
        <div className="border border-border py-12 text-center">
          <p className="text-sm text-muted">
            {search
              ? "No matching tasks found."
              : "No tasks available. Add your first task."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {weeklyGroups.map((week) => {
            const completedCount = week.tasks.filter(
              (task) => task.status === "Completed"
            ).length;

            const openCount =
              week.tasks.length - completedCount;

            const isExpanded =
              expandedWeek === week.key;

            return (
              <div
                key={week.key}
                className=""
              >
                <button
                  type="button"
                  onClick={() => onWeekToggle(week)}
                  aria-expanded={isExpanded}
                  className="w-full text-left transition-colors hover:bg-[#FAFAFF]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {formatDate(week.start)} -{" "}
                        {formatDate(week.end)}
                      </h3>

                      <p className="mt-1 text-[10px] text-muted">
                        {week.tasks.length}{" "}
                        {week.tasks.length === 1
                          ? "task"
                          : "tasks"}
                      </p>
                    </div>

                    {isExpanded ? (
                      <ChevronUp
                        size={19}
                        className="shrink-0 text-primary"
                      />
                    ) : (
                      <ChevronDown
                        size={19}
                        className="shrink-0 text-primary"
                      />
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 bg-pending p-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#E64B55] bg-[#FFD6D9] text-[#D93643]">
                        <X size={17} />
                      </div>

                      <div>
                        <p className="text-[10px] text-foreground">
                          Open Tasks
                        </p>

                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {String(openCount).padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-completed p-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-primary bg-[#DCE2FF] text-primary-dark">
                        <Check size={17} />
                      </div>

                      <div>
                        <p className="text-[10px] text-foreground">
                          Completed Tasks
                        </p>

                        <p className="mt-1 text-lg font-semibold text-foreground">
                          {String(completedCount).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border">
                    <div className="flex items-center justify-between py-3">
                      <h4 className="text-xs font-semibold text-foreground">
                        Tasks for this week
                      </h4>

                      <span className="text-[10px] text-muted">
                        {week.visibleTasks.length}{" "}
                        {week.visibleTasks.length === 1
                          ? "matching task"
                          : "matching tasks"}
                      </span>
                    </div>

                    <TaskList
                      tasks={[...week.visibleTasks].sort(
                        (a, b) =>
                          new Date(a.startAt) -
                          new Date(b.startAt)
                      )}
                      onToggle={onToggle}
                      onView={onView}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default WeeklyTaskSection;