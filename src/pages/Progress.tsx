import { useState, useRef } from "react";
import { initialUserProfile } from "../data/initialData";
import { Camera, Weight, TrendingUp, Upload } from "lucide-react";

export default function Progress() {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for preview
      const previewUrl = URL.createObjectURL(file);
      setPhotos([...photos, previewUrl]);
      
      // Keep input value null to allow selecting same file again
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-5 md:space-y-8">
       <header>
        <h1 className="text-3xl font-bold text-white">Your Progress</h1>
        <p className="text-gray-400">Tracking towards: Lean Muscle (Athletic Physique)</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <Weight size={18} />
                  <span>Current</span>
              </div>
              <p className="text-2xl font-bold text-white">{initialUserProfile.currentWeight} kg</p>
          </div>
          <div className="glass-panel p-4">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <TrendingUp size={18} />
                  <span>Pull-ups</span>
              </div>
              <p className="text-2xl font-bold text-white">0 <span className="text-sm text-gray-500">Max</span></p>
          </div>
      </div>

      {/* Photo Gallery */}
      <div className="space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-xl font-bold text-white">Weekly Photos</h2>
             <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
             >
                 <Upload size={18} />
                 Upload New
             </button>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileUpload}
             />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Existing Placeholders */}
              {[1, 2, 3].map((week) => (
                  <div key={week} className="glass-panel aspect-[3/4] flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                      <span className="relative z-10 font-bold text-lg text-white">Week {week}</span>
                      <p className="relative z-10 text-xs text-gray-400">Jan {10 + week * 7}, 2026</p>
                  </div>
              ))}

              {/* Uploaded Photos Preview */}
              {photos.map((url, idx) => (
                  <div key={`new-${idx}`} className="glass-panel aspect-[3/4] relative overflow-hidden group">
                      <img src={url} alt="Week Check-in" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-white font-bold">New Upload</span>
                      </div>
                  </div>
              ))}

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="glass-panel aspect-[3/4] flex flex-col items-center justify-center border-2 border-dashed border-gray-700 hover:border-white text-gray-600 hover:text-white transition-all cursor-pointer"
              >
                  <Camera size={32} />
                  <span className="mt-2 text-sm font-medium">Add Photo</span>
              </div>
          </div>
      </div>

      {/* Goals List */}
      <div className="glass-panel p-4 md:p-6">
          <h2 className="text-xl font-bold text-white mb-4">Transformation Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {initialUserProfile.goals.map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      <span className="text-gray-300 text-sm">{goal}</span>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
}
