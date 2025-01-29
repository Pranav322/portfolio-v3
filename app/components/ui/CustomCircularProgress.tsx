interface ProgressProps {
  value: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export function CustomCircularProgress({
  value,
  color = '#1DB954',
  size = 80,
  strokeWidth = 8,
}: ProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="text-white/20"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="transition-all duration-500 ease-out"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/90 font-medium text-lg">{Math.round(value)}%</span>
      </div>
    </div>
  );
}
