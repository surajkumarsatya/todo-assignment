import { X } from "lucide-react";

function TaskDetailsModal({ viewingTask, onClose }) {
  if (!viewingTask) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-end justify-center bg-black/40 sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-130 overflow-y-auto bg-white p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Task Details
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
            className="text-muted transition-colors hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-1 text-[11px] text-muted">
              Task Title
            </p>

            <h3 className="wrap-break-word text-sm font-semibold text-foreground">
              {viewingTask.title}
            </h3>
          </div>

          <div>
            <p className="mb-1 text-[11px] text-muted">
              Description
            </p>

            <p className="whitespace-pre-wrap wrap-break-word text-xs leading-6 text-foreground">
              {viewingTask.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-[11px] text-muted">
                Date
              </p>

              <p className="text-xs font-medium text-foreground">
                {new Date(viewingTask.startAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[11px] text-muted">
                Time
              </p>

              <p className="text-xs font-medium text-foreground">
                {new Date(viewingTask.startAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {" - "}
                {new Date(viewingTask.endAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-[11px] text-muted">
                Priority
              </p>

              <p className="text-xs font-medium text-foreground">
                {viewingTask.priority || "Not specified"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[11px] text-muted">
                Status
              </p>

              <span
                className={`inline-block px-2 py-1 text-[10px] font-medium ${
                  viewingTask.status === "Completed"
                    ? "bg-completed text-primary-dark"
                    : "bg-pending text-[#D93643]"
                }`}
              >
                {viewingTask.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full bg-primary text-xs font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;