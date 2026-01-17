import { useState } from "react";
import { Bell, Plus, Trash2, Clock } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  time: string;
  frequency: "Daily" | "Weekly";
  active: boolean;
}

export default function CustomReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Creatine", time: "20:30", frequency: "Daily", active: true },
    { id: 2, title: "Submit Photos", time: "09:00", frequency: "Weekly", active: false }
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");

  const addReminder = () => {
    if(!newTitle || !newTime) return;
    setReminders([
        ...reminders,
        { id: Date.now(), title: newTitle, time: newTime, frequency: "Daily", active: true }
    ]);
    setIsAdding(false);
    setNewTitle("");
    setNewTime("");
  };

  const toggleReminder = (id: number) => {
      setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const deleteReminder = (id: number) => {
      setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
            <Bell size={20} className="text-white" />
            Reminders
        </h3>
        <button 
            onClick={() => setIsAdding(!isAdding)}
            className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
        >
            <Plus size={18} />
        </button>
      </div>

      {isAdding && (
          <div className="mb-4 bg-white/5 p-3 rounded-lg space-y-3">
              <input 
                  type="text" 
                  placeholder="Drink Pre-workout..." 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-black/20 border-none text-sm"
              />
              <div className="flex gap-2">
                  <input 
                      type="time" 
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="bg-black/20 border-none text-sm flex-1 text-white"
                  />
                  <button onClick={addReminder} className="bg-white px-4 rounded text-sm font-bold text-black hover:bg-gray-200">
                      Add
                  </button>
              </div>
          </div>
      )}

      <div className="space-y-3">
          {reminders.map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg group">
                  <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${item.active ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-gray-600"}`} />
                      <div>
                          <p className={`font-medium text-sm ${item.active ? "text-gray-200" : "text-gray-500 line-through"}`}>
                              {item.title}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock size={10} />
                              <span>{item.time} • {item.frequency}</span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleReminder(item.id)} className="text-gray-400 hover:text-white">
                          <Bell size={14} />
                      </button>
                      <button onClick={() => deleteReminder(item.id)} className="text-red-400 hover:text-red-300">
                          <Trash2 size={14} />
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
