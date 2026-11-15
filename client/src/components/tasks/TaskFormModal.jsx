import { X, Clock, CalendarDays } from "lucide-react";

function TaskFormModal({ isOpen, editingTask, formData, setFormData, error, saving, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-130 overflow-y-auto bg-white p-6 sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">
            {editingTask ? "Edit Task" : "Add New Task"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-foreground hover:text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-[11px] text-[#666666]">
              Task title
            </label>

            <input
              required
              value={formData.title}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  title: event.target.value,
                })
              }
              placeholder="Enter task title"
              className="h-10.75 w-full border border-border px-3 text-xs outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] text-[#666666]">
              Set Time
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <Clock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      startTime: event.target.value,
                    })
                  }
                  className="h-10.75 w-full border border-border pl-9 pr-2 text-xs outline-none focus:border-primary"
                />
              </div>

              <div className="relative">
                <Clock
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />

                <input
                  type="time"
                  required
                  value={formData.endTime}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      endTime: event.target.value,
                    })
                  }
                  className="h-10.75 w-full border border-border pl-9 pr-2 text-xs outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] text-[#666666]">
              Set Date
            </label>

            <div className="relative">
              <CalendarDays
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
              />

              <input
                type="date"
                required
                value={formData.date}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    date: event.target.value,
                  })
                }
                className="h-10.75 w-full border border-border px-3 pr-9 text-xs outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] text-[#666666]">
              Priority (Optional)
            </label>

            <select
              value={formData.priority}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  priority: event.target.value,
                })
              }
              className="h-10.75 w-full border border-border bg-white px-3 text-xs outline-none focus:border-primary"
            >
              <option value="">Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-[11px] text-[#666666]">
              Description
            </label>

            <textarea
              rows={3}
              value={formData.description}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  description: event.target.value,
                })
              }
              placeholder="Add Description"
              className="w-full resize-none border border-border p-3 text-xs outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex h-11.5 w-full items-center justify-center bg-primary text-xs font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingTask
                ? "Save Changes"
                : "Create task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;