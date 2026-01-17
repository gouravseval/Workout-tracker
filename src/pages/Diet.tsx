import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { dietPlan } from "../data/initialData";
import ChatInterface from "../components/ChatInterface";
import { RefreshCw, CheckCircle, Circle, ChevronLeft, ChevronRight } from "lucide-react";

export default function Diet() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // NOTE: In a real app, 'meals' data would be fetched based on 'selectedDate'. 
  // For now, we reset the completion status when date changes, but keep the same plan.
  const [meals, setMeals] = useState(
    dietPlan.map((m) => ({ ...m, completed: false, spun: false }))
  );

  // Reset meals when date changes
  // In a real app with backend, this useEffect would fetch the log for selectedDate
  /* useEffect(() => {
       // fetchMeals(selectedDate).then(setMeals)
       // For this demo:
       setMeals(dietPlan.map((m) => ({ ...m, completed: false, spun: false })));
  }, [selectedDate]); */

  const toggleMeal = (index: number) => {
    const newMeals = [...meals];
    newMeals[index].completed = !newMeals[index].completed;
    setMeals(newMeals);
  };

  const spinMeal = (index: number) => {
    // A simple mock shuffle for now. In a real app, this would query a DB of healthy alternatives.
    const alternatives = [
      "Quinoa Salad with Chickpeas",
      "Greek Yogurt Parfait",
      "Lentil Soup with Brown Rice",
      "Tofu Stir-fry with Veggies",
      "Oatmeal with Almond Butter"
    ];
    const random = alternatives[Math.floor(Math.random() * alternatives.length)];
    
    const newMeals = [...meals];
    newMeals[index].items = [random]; // Replace items
    newMeals[index].spun = true;
    setMeals(newMeals);
  };

  const totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
  const consumedCalories = meals.filter(m => m.completed).reduce((acc, m) => acc + m.calories, 0);

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
            <div className="text-2xl font-bold text-blue-400">
              {consumedCalories} / {totalCalories}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              kcal Consumed
            </div>
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
                    <span>{meal.calories} kcal</span>
                    <span className="text-gray-300">{meal.protein}g P</span>
                    <span className="text-gray-500">{meal.carbs}g C</span>
                    <span className="text-gray-500">{meal.fats}g F</span>
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
                  className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-full"
                  title="Shuffle Meal"
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
