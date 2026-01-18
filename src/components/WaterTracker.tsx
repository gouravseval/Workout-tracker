import { useState, useEffect } from "react";
import { Plus, Minus, Droplets, Bell } from "lucide-react";
import { saveDailyLog, getDailyLog } from "../services/db";

export default function WaterTracker() {
  const [intake, setIntake] = useState(0); 
  const goal = 3500;
  
  // Load water data on mount
  useEffect(() => {
      getDailyLog(new Date()).then((data) => {
          if (data && typeof data.water === 'number') {
              setIntake(data.water);
          } else {
              setIntake(0);
          }
      });

      // Request notification permission on load
      if ("Notification" in window && Notification.permission !== "granted") {
          // We wait for user interaction usually, but check status here
      }
  }, []);

  const updateIntake = (newVal: number) => {
      setIntake(newVal);
      saveDailyLog(new Date(), 'water', newVal);
  };

  const requestNotification = () => {
      if (!("Notification" in window)) {
          alert("This browser does not support desktop notifications");
      } else if (Notification.permission === "granted") {
          new Notification("Hydration Reminders are already on! 💧");
      } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                  new Notification("Awesome! We'll remind you to drink water. 💧");
                  // Start a simple timer for demo purposes (real PWA would use service worker)
                  setInterval(() => {
                      new Notification("Time to drink some water! 💧", {
                          body: "Stay hydrated to reach your daily goal.",
                          icon: "/logo.png"
                      });
                  }, 60 * 60 * 1000); // Every hour
              }
          });
      }
  };

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
                <div className="flex gap-2">
                    <div className="p-2 bg-white/10 text-white rounded-lg">
                        <Droplets size={24} />
                    </div>
                    <button onClick={requestNotification} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30" title="Enable Reminders">
                        <Bell size={24} />
                    </button>
                </div>
                <span className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</span>
            </div>
            
            <h3 className="text-gray-400 text-sm font-medium mb-1">Water Intake</h3>
            <p className="text-2xl font-bold text-white mb-6">
                {(intake / 1000).toFixed(1)} <span className="text-gray-500 text-lg">/ {goal / 1000} L</span>
            </p>

            <div className="flex gap-2">
                <button 
                    onClick={() => updateIntake(Math.max(0, intake - 250))}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg flex justify-center"
                >
                    <Minus size={18} />
                </button>
                <button 
                    onClick={() => updateIntake(Math.min(goal + 500, intake + 250))}
                    className="flex-1 bg-white hover:bg-gray-200 text-black py-2 rounded-lg flex justify-center font-bold"
                >
                    <Plus size={18} />
                </button>
            </div>
        </div>
    </div>
  );
}
