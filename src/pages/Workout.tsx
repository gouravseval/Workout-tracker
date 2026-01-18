import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { workoutSchedule } from "../data/initialData";
import { saveDailyLog, getDailyLog } from "../services/db";
import { CheckCircle, Circle, Clock, BarChart, ChevronLeft, ChevronRight } from "lucide-react";

export default function Workout() {
  // State for the selected date, defaults to today
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get current day name like "Monday", "Tuesday" based on selectedDate
  const currentDay = format(selectedDate, "EEEE");
  
  // Create a type for the schedule keys
  type DayKey = keyof typeof workoutSchedule;
  
  // Fallback if day name doesn't match
  const schedule = workoutSchedule[currentDay as DayKey] || workoutSchedule["Monday"];
  
  const [exercises, setExercises] = useState(
    schedule.exercises.map((ex) => ({ ...ex, completed: false, setsCompleted: 0 }))
  );

  // Update exercises when the selected date changs
  useEffect(() => {
     const defaultExercises = schedule.exercises.map((ex) => ({ ...ex, completed: false, setsCompleted: 0 }));
     setExercises(defaultExercises);

     getDailyLog(selectedDate).then((data) => {
         if (data && data.workout) {
             setExercises(data.workout);
         }
     });
  }, [selectedDate, currentDay]); // Add currentDay dependency to ensure schedule update triggers fetch

  const handlePrevDay = () => setSelectedDate((prev) => subDays(prev, 1));
  const handleNextDay = () => setSelectedDate((prev) => addDays(prev, 1));

  const toggleSet = (exIndex: number) => {
      const newExercises = [...exercises];
      const ex = newExercises[exIndex];
      // simplified logic: simple toggle complete/incomplete for the whole exercise
      ex.completed = !ex.completed;
      setExercises(newExercises);
      saveDailyLog(selectedDate, 'workout', newExercises);
  };
  // Image mapping helper
  // Image mapping helper
  const getExerciseImage = (name: string) => {
      const n = name.toLowerCase();
      
      // Specific Variations
      if (n.includes("fly")) return "/exercises/fly.png";
      if (n.includes("lunge") || n.includes("split")) return "/exercises/lunge.png";
      if (n.includes("calf")) return "/exercises/calf.png";
      if (n.includes("dip")) return "/exercises/dip.png";
      if (n.includes("shrug")) return "/exercises/shrug.png";

      // General Categories
      if (n.includes("press") || n.includes("push") || n.includes("chest") || n.includes("skull")) return "/exercises/press.png";
      if (n.includes("pull") || n.includes("lat") || n.includes("chin")) return "/exercises/pull.png";
      if (n.includes("row")) return "/exercises/row.png";
      if (n.includes("squat") || n.includes("leg press")) return "/exercises/squat.png";
      if (n.includes("deadlift") || n.includes("rdl") || n.includes("hyperextension")) return "/exercises/hinge.png";
      if (n.includes("curl")) return "/exercises/curl.png";
      if (n.includes("extension") || n.includes("rope")) return "/exercises/extension.png";
      if (n.includes("raise") || n.includes("face")) return "/exercises/raise.png";
      if (n.includes("plank") || n.includes("crunch") || n.includes("situp") || n.includes("twist") || n.includes("leg") || n.includes("walk")) return "/exercises/core.png";
      
      return "/exercises/press.png"; // Fallback
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <header>
         <div className="flex items-center gap-3 mb-2">
             <div className="flex items-center gap-2">
                 <button onClick={handlePrevDay} className="p-1 hover:bg-white/10 rounded">
                     <ChevronLeft size={16} className="text-gray-400" />
                 </button>
                 <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                     {currentDay} ({format(selectedDate, "MMM d")})
                 </span>
                 <button onClick={handleNextDay} className="p-1 hover:bg-white/10 rounded">
                     <ChevronRight size={16} className="text-gray-400" />
                 </button>
             </div>
         </div>
         <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{schedule.focus}</h1>
         <p className="text-gray-400 text-sm md:text-base">
             7:00 PM Scheduled Time • Est. 60-70 mins
         </p>
      </header>

      <div className="grid gap-4">
          {exercises.map((ex, idx) => (
              <div 
                key={idx} 
                className={`glass-panel p-4 md:p-5 flex items-center justify-between group hover:border-blue-500/30 transition-all ${
                    ex.completed ? "border-green-500/30 bg-green-500/5" : ""
                }`}
              >
                  <div className="flex items-start gap-4 flex-1">
                      {/* Exercise Photo (Placeholder) */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 shrink-0 border border-white/10 flex items-center justify-center">
                          <img 
                            src={`${getExerciseImage(ex.name)}?v=2`} 
                            alt={ex.name}
                            className="w-full h-full object-cover p-2"
                            onError={(e) => {
                                // Fallback to letter if image fails to load
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent && !parent.querySelector('.fallback-letter')) {
                                    const letter = document.createElement('span');
                                    letter.className = 'fallback-letter text-2xl font-bold text-white';
                                    letter.textContent = ex.name.charAt(0);
                                    parent.appendChild(letter);
                                }
                            }}
                          />
                      </div>
                      
                      <div className="flex-1">
                          <h3 className={`font-bold text-base md:text-xl ${ex.completed ? "text-white line-through" : "text-white"}`}>
                              {ex.name}
                          </h3>
                          <div className="flex gap-4 mt-1 text-sm text-gray-400">
                             <div className="flex items-center gap-1">
                                 <BarChart size={14} className="text-gray-400" />
                                 <span>{ex.sets} Sets</span>
                             </div>
                             <div className="flex items-center gap-1">
                                 <Clock size={14} className="text-gray-400" />
                                 <span>{ex.reps} Reps</span>
                             </div>
                          </div>
                      </div>
                  </div>

                  <button 
                    onClick={() => toggleSet(idx)}
                    className={`p-3 rounded-full transition-all ${
                        ex.completed ? "text-white bg-white/10" : "text-gray-600 hover:text-white hover:bg-white/10"
                    }`}
                  >
                      {ex.completed ? <CheckCircle size={32} /> : <Circle size={32} />}
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
}
