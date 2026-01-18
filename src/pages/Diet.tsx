import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import { dietPlan } from "../data/initialData";
import { saveDailyLog, getDailyLog } from "../services/db";
import { getAlternativeMeal } from "../services/gemini";
import ChatInterface from "../components/ChatInterface";
import { RefreshCw, CheckCircle, Circle, ChevronLeft, ChevronRight } from "lucide-react";

export default function Diet() {
  // Start from TOMORROW as per user request
  const [selectedDate, setSelectedDate] = useState(() => addDays(new Date(), 1));
  
  const [loadingMeal, setLoadingMeal] = useState<number | null>(null);

  // NOTE: In a real app, 'meals' data would be fetched based on 'selectedDate'. 
  // For now, we reset the completion status when date changes, but keep the same plan.
  const [meals, setMeals] = useState(
    dietPlan.map((m) => ({ ...m, completed: false, spun: false }))
  );

  // Reset meals when date changes and try to fetch from DB
  useEffect(() => {
    // 1. Reset to default first
    const defaultState = dietPlan.map((m) => ({ ...m, completed: false, spun: false }));
    setMeals(defaultState);

    // 2. Fetch from Cloud
    getDailyLog(selectedDate).then((data) => {
        if (data && data.diet) {
            // Merge cloud data with default plan
            // We trust the cloud data for 'completed' and 'items' if they exist
            setMeals(data.diet);
        }
    });
  }, [selectedDate]);

  const toggleMeal = (index: number) => {
    const newMeals = [...meals];
    newMeals[index].completed = !newMeals[index].completed;
    setMeals(newMeals);
    saveDailyLog(selectedDate, 'diet', newMeals);
  };

  const spinMeal = async (index: number) => {
    setLoadingMeal(index);
    const original = meals[index];
    
    // AI Shuffle
    const alternative = await getAlternativeMeal(original.meal, original.items);
    
    if (alternative) {
        const newMeals = [...meals];
        newMeals[index].items = [alternative]; 
        newMeals[index].spun = true;
        setMeals(newMeals);
        saveDailyLog(selectedDate, 'diet', newMeals);
    }
    setLoadingMeal(null);
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Meal List Section */}
      <div className="lg:col-span-2 space-y-5">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Diet Plan</h1>
            <div className="flex items-center gap-2">
                 <button onClick={() => setSelectedDate(d => subDays(d, 1))} className="p-1 hover:bg-white/10 rounded">
                     <ChevronLeft size={20} className="text-gray-400" />
                 </button>
                 <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                     {format(selectedDate, "EEEE, MMM d")}
                 </span>
                 <button onClick={() => setSelectedDate(d => addDays(d, 1))} className="p-1 hover:bg-white/10 rounded">
                     <ChevronRight size={20} className="text-gray-400" />
                 </button>
            </div>
          </div>
          <div className="text-right">
             {/* Only Day Navigation Logic Here */}
          </div>
        </header>

        <div className="space-y-4">
          {meals.map((meal, idx) => (
            <div
              key={idx}
              className={`glass-panel p-3 md:p-4 flex flex-col md:flex-row gap-4 transition-all ${
                meal.completed ? "opacity-50 grayscale" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-lg text-white">{meal.meal}</h3>
                  <div className="flex gap-4 text-xs font-mono text-gray-400 mt-1">
                    {/* Macros hidden as per user request */}
                  </div>
                </div>
                <ul className="text-sm text-gray-300 list-disc list-inside">
                  {meal.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-3 justify-end md:border-l border-white/10 md:pl-4">
                <button
                  onClick={() => spinMeal(idx)}
                  disabled={loadingMeal === idx}
                  className={`p-2 rounded-full transition-all ${
                      loadingMeal === idx ? "bg-blue-500/20 text-blue-400 animate-spin" : "text-blue-400 hover:bg-blue-400/10"
                  }`}
                  title="Shuffle Meal with AI"
                >
                  <RefreshCw size={20} />
                </button>
                <button
                  onClick={() => toggleMeal(idx)}
                  className={`p-2 rounded-full transition-all ${
                    meal.completed ? "text-white bg-white/10" : "text-gray-500 hover:text-white"
                  }`}
                >
                  {meal.completed ? <CheckCircle size={32} /> : <Circle size={32} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar: AI Coach */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Nutrition Assistant</h2>
        <ChatInterface />
        
        <div className="glass-panel p-4">
            <h3 className="font-bold text-white mb-2">Water Intake</h3>
             {/* Simple water tracker placeholder */}
             <div className="flex items-center gap-2">
                 <span className="text-blue-400 text-2xl font-bold">1.5L</span>
                 <span className="text-gray-500">/ 3.5L</span>
             </div>
             <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                 <div className="bg-blue-500 h-full w-[40%]"></div>
             </div>
        </div>
      </div>
    </div>
  );
}
