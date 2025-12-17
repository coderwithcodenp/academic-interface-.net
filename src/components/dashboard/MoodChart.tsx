import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MoodChartProps {
  data: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

const COLORS = {
  positive: 'hsl(145, 60%, 42%)',
  neutral: 'hsl(220, 15%, 55%)',
  negative: 'hsl(0, 55%, 55%)',
};

export function MoodChart({ data }: MoodChartProps) {
  const chartData = [
    { name: 'Positive', value: data.positive, color: COLORS.positive },
    { name: 'Neutral', value: data.neutral, color: COLORS.neutral },
    { name: 'Negative', value: data.negative, color: COLORS.negative },
  ].filter(item => item.value > 0);

  const total = data.positive + data.neutral + data.negative;

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No mood data available
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${Math.round((value / total) * 100)}%`, 'Entries']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-sm text-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
