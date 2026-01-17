import { useState } from "react";
import { Plus, Minus, Droplets } from "lucide-react";

export default function WaterTracker() {
  const [intake, setIntake] = useState(1500); // ml
  const goal = 3500;
  
  const percentage = Math.min((intake / goal) * 100, 100);

  return (
    <div className="glass-panel p-6 relative overflow-hidden">
        {/* Background Wave Effect (CSS based simplified) */}
        <div 
            className="absolute bottom-0 left-0 w-full bg-white/5 transition-all duration-500 ease-out"
            style={{ height: `${percentage}%` }}
        />

        <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 text-white rounded-lg">
                    <Droplets size={24} />
                </div>
                <span className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</span>
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-1">Water Intake</h3>
            <p className="text-2xl font-bold text-white mb-6">
                {(intake / 1000).toFixed(1)} <span className="text-gray-500 text-lg">/ {goal / 1000} L</span>
            </p>

            <div className="flex gap-2">
                <button 
                    onClick={() => setIntake(Math.max(0, intake - 250))}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg flex justify-center"
                >
                    <Minus size={18} />
                </button>
                <button 
                    onClick={() => setIntake(Math.min(goal + 500, intake + 250))}
                    className="flex-1 bg-white hover:bg-gray-200 text-black py-2 rounded-lg flex justify-center font-bold"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    </div>
  );
}
