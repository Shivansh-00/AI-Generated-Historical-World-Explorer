interface TimelineSliderProps {
  years: number[];
  year: number;
  onChange: (year: number) => void;
}

const yearLabel = (value: number) => (value < 0 ? `${Math.abs(value)} BCE` : `${value} AD`);

export default function TimelineSlider({ years, year, onChange }: TimelineSliderProps) {
  const index = Math.max(0, years.indexOf(year));

  return (
    <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-700">
      <label className="text-xs block mb-2">Time Evolution: {yearLabel(year)}</label>
      <input
        type="range"
        min={0}
        max={Math.max(0, years.length - 1)}
        value={index}
        onChange={(e) => onChange(years[Number(e.target.value)])}
        className="w-full"
      />
      <div className="text-[10px] text-slate-400 mt-2 flex justify-between">
        {years.map((y) => (
          <span key={y}>{yearLabel(y)}</span>
        ))}
      </div>
    </div>
  );
}
