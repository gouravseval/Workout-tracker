import { useState } from "react";
import { addDays, format, startOfWeek, addWeeks, isSameDay } from "date-fns";
import { workoutSchedule } from "../data/initialData";
import { ChevronLeft, ChevronRight, X, Clock, BarChart, Dumbbell } from "lucide-react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // Generating 3 months of data logic would be complex for a full view, 
  // so we'll show a scrolling weekly view that can navigate through months.
  // Or better, a monthly view. Let's do a Month view.

  const renderMonth = (date: Date) => {
    const start = startOfWeek(new Date(date.getFullYear(), date.getMonth(), 1));
    const weeks = [];
    let day = start;

    // Generate 5-6 weeks to cover the month
    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            week.push(day);
            day = addDays(day, 1);
        }
        weeks.push(week);
        if (day.getMonth() !== date.getMonth() && i >= 4) break; 
    }

    return weeks;
  };

  const weeks = renderMonth(currentDate);

  const getWorkoutForDate = (date: Date) => {
      const dayName = format(date, "EEEE");
      // @ts-ignore
      return workoutSchedule[dayName] || workoutSchedule["Monday"];
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl md:text-3xl font-bold text-white">Workout Calendar</h1>
           <p className="text-gray-400 text-sm md:text-base">Plan your next 90 days</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto justify-between md:justify-end">
            <button 
                onClick={() => setCurrentDate(d => addWeeks(d, -4))}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white"
            >
                <ChevronLeft size={20} />
            </button>
            <span className="px-4 py-2 bg-white/5 rounded-lg text-white font-bold flex-1 md:flex-none text-center min-w-[140px]">
                {format(currentDate, "MMMM yyyy")}
            </span>
            <button 
                onClick={() => setCurrentDate(d => addWeeks(d, 4))}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white"
            >
                <ChevronRight size={20} />
            </button>
        </div>
      </header>
      <div className="glass-panel p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[800px]">
              <div className="grid grid-cols-7 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                      <div key={d} className="text-center text-gray-500 font-medium text-sm border-b border-gray-700 pb-2">
                          {d}
                      </div>
                  ))}
              </div>

              <div className="space-y-2">
                  {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="grid grid-cols-7 gap-2">
                          {week.map((day, dIdx) => {
                              const isToday = isSameDay(day, new Date());
                              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                              const workout = getWorkoutForDate(day);
                              const isRest = workout.focus.includes("Rest");

                              return (
                                  <div 
                                    key={dIdx} 
                                    className={`
                                        min-h-[100px] p-2 rounded-lg border border-transparent transition-all
                                        ${!isCurrentMonth ? "opacity-30" : "opacity-100"}
                                        ${isToday ? "bg-white text-black font-bold" : "bg-white/5 hover:bg-white/10"}
                                        cursor-pointer hover:border-white/50
                                    `}
                                    onClick={() => handleDayClick(day)}
                                  >
                                      <div className="text-right mb-1">
                                          <span className={`text-xs font-bold ${isToday ? "text-black" : "text-gray-500"}`}>
                                              {format(day, "d")}
                                          </span>
                                      </div>
                                      
                                      <div className="px-1">
                                          {isRest ? (
                                              <span className="block w-full px-1 py-0.5 rounded text-[10px] bg-white/10 text-white truncate opacity-50">
                                                  REST
                                              </span>
                                          ) : (
                                              <span className={`block w-full px-1 py-0.5 rounded text-[10px] truncate ${isToday ? "bg-black/10 text-black font-bold" : "bg-white/10 text-white"} `} title={workout.focus}>
                                                  {workout.focus.split(" +")[0]}
                                              </span>
                                          )}
                                      </div>
                                  </div>
                              );
                          })}
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* Workout Details Modal */}
      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
             onClick={() => setIsModalOpen(false)}>
            <div className="glass-panel w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col items-stretch" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-900/50">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                            {format(selectedDate, "EEEE, MMMM d")}
                        </h2>
                        <span className="bg-white text-black text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                            {getWorkoutForDate(selectedDate).focus.split(" +")[0]} Focus
                        </span>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-4">
                    <h3 className="text-xl font-bold text-gray-200 mb-4">{getWorkoutForDate(selectedDate).focus}</h3>
                    
                    {getWorkoutForDate(selectedDate).exercises.map((ex: any, idx: number) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-4 flex gap-4 items-start">
                             <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 shrink-0 border border-white/10">
                                <img 
                                    src={`https://placehold.co/100x100/1e293b/white?text=${ex.name.charAt(0)}`}
                                    alt={ex.name}
                                    className="w-full h-full object-cover opacity-80"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-white text-lg">{ex.name}</h4>
                                <div className="flex gap-4 mt-2 text-sm text-gray-400">
                                    <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded">
                                        <BarChart size={14} className="text-gray-300" />
                                        <span>{ex.sets} Sets</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded">
                                        <Dumbbell size={14} className="text-white" />
                                        <span>{ex.reps} Reps</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Show Rest Day Message if applicable */}
                    {getWorkoutForDate(selectedDate).exercises.length <= 3 && getWorkoutForDate(selectedDate).focus.includes("Rest") && (
                        <div className="text-center py-8 text-gray-400">
                            <div className="mb-4 inline-flex p-4 bg-white/5 rounded-full text-white">
                                <Clock size={48} />
                            </div>
                            <p className="text-lg">Enjoy your rest day! Focus on recovery.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
