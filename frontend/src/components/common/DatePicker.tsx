import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

function getMonthMatrix(year: number, month: number): (Date | null)[][] {
  // month is 0-indexed. Returns weeks -> array of Date | null
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // JS getDay(): 0 = Sunday. We want Monday-first, so shift.
  const startOffset = (firstDay.getDay() + 6) % 7;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!(
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date | null;
  placeholder?: string;
}

export default function DatePicker({
  value,
  onChange,
  minDate = new Date(new Date().setHours(0, 0, 0, 0)),
  placeholder = "Select date",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(value || new Date());
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const weeks = getMonthMatrix(year, month);

  const goPrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handlePick = (date: Date | null) => {
    if (!date) return;
    if (minDate && date < minDate) return;
    onChange(date);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 bg-transparent px-5 text-left transition-all focus:outline-none cursor-pointer"
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value ? formatDate(value) : placeholder}
        </span>
      </button>

      {open && (
        <div className="absolute z-[999] mt-2 w-80 rounded-2xl border border-white/10 bg-neutral-900/90 p-4 shadow-2xl backdrop-blur-xl">
          {/* Month nav */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={goPrevMonth}
              className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold text-white">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={goNextMonth}
              className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="mb-1 grid grid-cols-7 gap-1">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="flex h-8 items-center justify-center text-xs font-medium text-white/40"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {weeks.flat().map((date, i) => {
              const disabled = !!(date && minDate && date < minDate);
              const selected = isSameDay(date, value);
              const today = isSameDay(date, new Date());

              return (
                <button
                  key={i}
                  type="button"
                  disabled={!date || disabled}
                  onClick={() => handlePick(date)}
                  className={[
                    "flex h-9 w-9 items-center justify-center rounded-lg text-sm transition-colors",
                    !date ? "invisible" : "",
                    disabled ? "cursor-not-allowed text-white/20" : "text-white/80 hover:bg-white/10",
                    selected
                      ? "bg-emerald-400 font-semibold text-neutral-900 hover:bg-emerald-400"
                      : "",
                    today && !selected ? "border border-emerald-400/50" : "",
                  ].join(" ")}
                >
                  {date ? date.getDate() : ""}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className="text-xs font-medium text-white/50 hover:text-white"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handlePick(new Date())}
              className="rounded-lg bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-emerald-300"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- Demo wrapper (remove in your real app, kept here just to preview) --- */
export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex min-h-[500px] w-full items-start justify-center bg-neutral-950 p-10">
      <div className="w-80">
        <DatePicker value={date} onChange={setDate} />
      </div>
    </div>
  );
}
