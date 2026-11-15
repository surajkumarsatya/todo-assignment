
import { Settings, Bell } from "lucide-react";

function Header() {
  return (
    <header className="mb-7 flex items-center justify-between">
      <div>
        <p className="text-xs text-muted">
          Welcome back
        </p>

        <h1 className="mt-1 text-xl font-semibold text-foreground">
          My Tasks
        </h1>
      </div>

      <div className="flex items-center gap-4 text-foreground">
        <button
          type="button"
          aria-label="Settings"
          className="transition-colors hover:text-primary"
        >
          <Settings size={19} strokeWidth={1.7} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="transition-colors hover:text-primary"
        >
          <Bell size={19} strokeWidth={1.7} />
        </button>
      </div>
    </header>
  );
}

export default Header;
