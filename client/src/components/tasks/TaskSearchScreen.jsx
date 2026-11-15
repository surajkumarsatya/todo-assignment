import { Search, ArrowLeft } from "lucide-react";
import TaskList from "./TaskList";

function TaskSearchScreen({ search, setSearch, onBack, error, filteredTasks, onToggle, onView, onEdit, onDelete }) {
  return (
    <section className="min-h-[calc(100vh-3.5rem)]">
      <header className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to dashboard"
          className="flex h-8 w-8 shrink-0 items-center justify-center text-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft size={21} strokeWidth={1.8} />
        </button>

        <h1 className="text-base font-semibold text-foreground">
          Search Tasks
        </h1>
      </header>

      <div className="relative mb-6">
        <input
          autoFocus
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search for a task"
          aria-label="Search tasks by title or description"
          className="h-11.5 w-full border border-border bg-white px-4 pr-12 text-xs text-foreground outline-none transition-colors placeholder:text-muted focus:border-primary"
        />

        <Search
          size={19}
          strokeWidth={1.7}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foreground"
        />
      </div>

      {error && (
        <p className="mb-4 text-xs text-red-500">
          {error}
        </p>
      )}

      {!search.trim() ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted">
            Start typing to search your tasks.
          </p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted">
            No matching tasks found.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold text-foreground">
              Search Results
            </h2>

            <span className="text-[10px] text-muted">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "result" : "results"}
            </span>
          </div>

          <TaskList
            tasks={[...filteredTasks].sort(
              (a, b) =>
                new Date(a.startAt) - new Date(b.startAt)
            )}
            onToggle={onToggle}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </>
      )}
    </section>
  );
}

export default TaskSearchScreen;