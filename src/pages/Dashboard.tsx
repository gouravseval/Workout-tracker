import { workoutSchedule } from "../data/initialData";
import { format } from "date-fns";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import WaterTracker from "../components/WaterTracker";
import CustomReminders from "../components/CustomReminders";

export default function Dashboard() {
  const dayName = format(new Date(), "EEEE");
  // @ts-ignore
  const todayWorkout = workoutSchedule[dayName] || workoutSchedule["Monday"];

  return (
    <div className="space-y-5 md:space-y-8">
      <header>
        <h2 className="text-xl md:text-3xl font-bold text-white">Hello, Gourav 👋</h2>
        <p className="text-gray-400 text-sm md:text-base">Let's crush your {dayName} goals.</p>
      </header>

      {/* Main Focus Card */}
      <div className="glass-panel p-4 md:p-6 bg-white/5 border-white/10">
        <div className="flex justify-between items-center mb-4">
            <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
                Today's Session
            </span>
            <span className="text-gray-400 text-sm">7:00 PM</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{todayWorkout.focus}</h3>
        <p className="text-gray-400 mb-6 text-sm">{todayWorkout.exercises.length} Exercises Scheduled</p>
        
        <Link to="/workout" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
            <Play size={20} fill="currentColor" />
            Start Workout
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WaterTracker />
        <CustomReminders />
        
        {/* Quick Stats Placeholder */}
        <div className="glass-panel p-4 md:p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-gray-400 font-medium mb-1">Calories Consumed</h3>
                <p className="text-2xl font-bold text-white">1,250 <span className="text-gray-500 text-lg">/ 2,200</span></p>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-4">
                 <div className="bg-white h-full w-[55%] rounded-full"></div>
            </div>
            <div className="mt-4 text-sm text-gray-400">
                <span className="text-white font-bold">55%</span> of daily goal
            </div>
        </div>
      </div>
    </div>
  );
}
