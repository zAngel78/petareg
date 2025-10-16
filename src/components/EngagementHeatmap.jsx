import { Flame, Clock, TrendingUp } from 'lucide-react';

export default function EngagementHeatmap() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['12am', '3am', '6am', '9am', '12pm', '3pm', '6pm', '9pm'];

  // Simulated engagement data (0-100)
  const generateHeatmapData = () => {
    const data = [];
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 8; hour++) {
        let value;
        // Wed 8pm is optimal (from research)
        if (day === 2 && hour === 6) {
          value = 100; // Peak engagement
        } else if (day >= 1 && day <= 4 && hour >= 4 && hour <= 7) {
          value = 70 + Math.random() * 25; // High engagement weekday evenings
        } else if (hour >= 5 && hour <= 7) {
          value = 50 + Math.random() * 30; // Medium-high evenings
        } else if (hour >= 2 && hour <= 4) {
          value = 40 + Math.random() * 20; // Medium daytime
        } else {
          value = 10 + Math.random() * 30; // Low engagement
        }
        data.push({ day, hour, value: Math.round(value) });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();

  const getColor = (value) => {
    if (value >= 90) return 'bg-accent-red';
    if (value >= 75) return 'bg-orange-500';
    if (value >= 60) return 'bg-accent-yellow';
    if (value >= 45) return 'bg-green-500';
    if (value >= 30) return 'bg-accent-cyan';
    return 'bg-lab-800';
  };

  const getOpacity = (value) => {
    return Math.min(value / 100, 1);
  };

  return (
    <div className="lab-card p-6 bg-gradient-to-br from-lab-900/80 to-lab-950/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h3 className="subsection-title">Engagement Heatmap Analysis</h3>
            <p className="text-xs text-lab-500">Optimal posting times based on audience activity patterns</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-red/10 border border-accent-red/30">
          <Clock className="w-3 h-3 text-accent-red" />
          <span className="text-xs font-mono text-accent-red font-semibold">Peak: Wed 8 PM</span>
        </div>
      </div>

      <div className="overflow-x-auto p-4 rounded-lg bg-lab-800/20">
        <div className="inline-block min-w-full">
          {/* Hour labels */}
          <div className="flex mb-3">
            <div className="w-16"></div>
            {hours.map((hour, idx) => (
              <div key={idx} className="w-16 text-xs text-lab-400 text-center font-mono font-semibold">
                {hour}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {days.map((day, dayIdx) => (
            <div key={dayIdx} className="flex items-center mb-1.5">
              <div className="w-16 text-xs text-lab-400 font-mono font-semibold">{day}</div>
              {hours.map((hour, hourIdx) => {
                const cellData = heatmapData.find(d => d.day === dayIdx && d.hour === hourIdx);
                const isOptimal = dayIdx === 2 && hourIdx === 6;

                return (
                  <div
                    key={hourIdx}
                    className="w-16 h-11 mx-0.5 rounded-md relative group cursor-pointer transition-all hover:scale-110 hover:z-10"
                  >
                    <div
                      className={`w-full h-full rounded-md ${getColor(cellData.value)} ${
                        isOptimal ? 'ring-2 ring-white shadow-lg shadow-accent-red/50 animate-pulse' : 'shadow-sm'
                      } transition-all`}
                      style={{ opacity: getOpacity(cellData.value) }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-lab-900/95 backdrop-blur-md border border-lab-700 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                      <div className="font-semibold text-lab-100 mb-1">{day} {hour}</div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-accent-cyan" />
                        <span className="text-accent-cyan font-mono font-bold">{cellData.value}%</span>
                        <span className="text-lab-500">engagement</span>
                      </div>
                      {isOptimal && (
                        <div className="mt-1 pt-1 border-t border-lab-700 text-accent-yellow font-semibold">
                          ⭐ Optimal Time
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-lab-800">
        <div className="flex items-center gap-6">
          <span className="text-xs font-semibold text-lab-400 uppercase tracking-wider">Engagement Level:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-lab-800 rounded shadow-inner"></div>
              <span className="text-xs text-lab-500">Low (0-30%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-accent-cyan rounded shadow-sm"></div>
              <span className="text-xs text-lab-500">Medium (30-60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-accent-yellow rounded shadow-sm"></div>
              <span className="text-xs text-lab-500">High (60-90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-accent-red rounded shadow-md"></div>
              <span className="text-xs text-lab-500">Peak (90-100%)</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-lab-500 italic flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
          Industry benchmarks for Higher Education
        </div>
      </div>
    </div>
  );
}
