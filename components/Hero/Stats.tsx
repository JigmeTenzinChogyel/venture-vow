type StatItemProps = {
  value: string | number;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
        {value}
      </div>
      <div className="text-sm md:text-base text-gray-300">{label}</div>
    </div>
  );
}

type StatsProps = {
  vowsMade: number;
  destinations: number;
  completed: number;
};

export default function Stats({
  vowsMade,
  destinations,
  completed,
}: StatsProps) {
  return (
    <div className="mt-20 pt-12 border-t border-white/20">
      <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
        <StatItem value={vowsMade.toLocaleString()} label="Vows Made" />
        <StatItem value={destinations.toLocaleString()} label="Destinations" />
        <StatItem value={completed.toLocaleString()} label="Completed" />
      </div>
    </div>
  );
}
