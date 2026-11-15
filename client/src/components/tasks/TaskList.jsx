import { Check, Eye, Pencil, Trash2 } from "lucide-react";

function TaskList({ tasks, onToggle, onView, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted">No tasks found.</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => {
        const isCompleted = task.status === "Completed";

        return (
          <div
            key={task._id}
            className="flex min-h-12.25 items-center gap-3 border-b border-border py-3"
          >
            <button
              type="button"
              onClick={() => onToggle(task._id)}
              aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
              className={`flex h-4 w-4 shrink-0 items-center justify-center border transition-colors ${
                isCompleted
                  ? "border-primary bg-primary text-white"
                  : "border-primary bg-white"
              }`}
            >
              {isCompleted && <Check size={12} strokeWidth={2.5} />}
            </button>

            <span
              className={`min-w-0 flex-1 truncate text-[12px] font-medium ${
                isCompleted
                  ? "text-muted line-through"
                  : "text-foreground"
              }`}
            >
              {task.title}
            </span>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => onView(task)}
                aria-label="View task"
                title="View task"
                className="p-1 text-[#BDBDBD] transition-colors hover:text-primary"
              >
                <Eye size={17} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(task._id)}
                aria-label="Delete task"
                title="Delete task"
                className="p-1 text-[#BDBDBD] transition-colors hover:text-red-500"
              >
                <Trash2 size={17} strokeWidth={1.8} />
              </button>

              <button
                type="button"
                onClick={() => onEdit(task)}
                aria-label="Edit task"
                title="Edit task"
                className="p-1 text-[#BDBDBD] transition-colors hover:text-primary"
              >
                <Pencil size={17} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskList;
