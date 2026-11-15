import { ChevronLeft, ChevronRight } from "lucide-react";

function CalendarSection({ calendarDays, selectedDate, onDateSelect, onWeekChange, onToday }) {
  return (
    <section className="mb-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Calendar
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onWeekChange(-1)}
            aria-label="Previous week"
            className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:bg-[#F4F5FF] hover:text-primary"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={onToday}
            className="text-[10px] font-medium text-primary"
          >
            Today
          </button>

          <button
            type="button"
            onClick={() => onWeekChange(1)}
            aria-label="Next week"
            className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:bg-[#F4F5FF] hover:text-primary"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item) => (
          <button
            key={item.fullDate}
            type="button"
            onClick={() => onDateSelect(item.fullDate)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 py-3 transition-colors ${
              selectedDate === item.fullDate
                ? "bg-primary text-white"
                : "text-muted hover:bg-[#F4F5FF]"
            }`}
          >
            <span className="text-[9px]">
              {item.day}
            </span>

            <span className="text-xs font-medium">
              {item.date}
            </span>

            {selectedDate === item.fullDate && (
              <span className="h-1 w-1 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CalendarSection;