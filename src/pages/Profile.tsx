import { useState } from "react";
import { initialUserProfile } from "../data/initialData";
import { LogOut, Save, Database, Key } from "lucide-react";
import { auth } from "../services/firebase";

export default function Profile() {
  const [showKeys, setShowKeys] = useState(false);

  return (
    <div className="space-y-5 md:space-y-8 max-w-3xl">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-white">Profile & Settings</h1>
           <p className="text-gray-400">Manage your data and keys</p>
        </div>
        <button 
           onClick={() => auth.signOut()}
           className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 hover:text-red-400 transition-colors"
        >
            <LogOut size={18} />
            Logout
        </button>
      </header>

      {/* Connection Status Badge (Visible if connected) */}
      {import.meta.env.VITE_FIREBASE_API_KEY && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold">Cloud Synced & AI Ready</span>
          </div>
      )}

      {/* User Info */}
      <div className="glass-panel p-4 md:p-6">
          <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center text-2xl font-bold">
                  {initialUserProfile.name.charAt(0)}
              </div>
              <div>
                  <h2 className="text-xl font-bold text-white">{initialUserProfile.name}</h2>
                  <p className="text-gray-400">Fitness Enthusiast</p>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white/5 rounded-lg">
                  <span className="block text-gray-500 mb-1">Diet Type</span>
                  <span className="text-white font-medium">{initialUserProfile.dietType}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                  <span className="block text-gray-500 mb-1">Workout Time</span>
                  <span className="text-white font-medium">{initialUserProfile.workoutTime} Today</span>
              </div>
          </div>
      </div>

      {/* Setup Guide - Only show if keys are missing from .env */}
      {!import.meta.env.VITE_FIREBASE_API_KEY && (
      <div className="glass-panel p-4 md:p-6 border border-white/10">
          <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 text-white rounded-lg">
                  <Key size={24} />
              </div>
              <div>
                  <h3 className="text-xl font-bold text-white mb-2">App Setup Required</h3>
                  <p className="text-gray-400 mb-4">
                      To make this app fully functional (save data online and use AI), you need to provide your own 
                      Firebase and Gemini API keys. This keeps it 100% free for you.
                  </p>
                  
                  <button 
                    onClick={() => setShowKeys(!showKeys)}
                    className="text-white underline hover:text-gray-300 font-bold"
                  >
                      {showKeys ? "Hide Instructions" : "Show Setup Instructions"}
                  </button>

                  {showKeys && (
                      <div className="mt-4 space-y-4 bg-black/40 p-4 rounded-lg text-sm text-gray-300">
                          <ol className="list-decimal list-inside space-y-2">
                              <li>Go to <a href="https://console.firebase.google.com" target="_blank" className="text-white underline">Firebase Console</a> and create a new project.</li>
                              <li>Enable <strong>Authentication</strong> (Email/Password).</li>
                              <li>Enable <strong>Firestore Database</strong>.</li>
                              <li>Copy the config object.</li>
                              <li>Open <code>src/services/firebase.ts</code> in your code editor and paste the keys.</li>
                              <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-white underline">Google AI Studio</a>.</li>
                              <li>Get a Free API Key and paste it in <code>src/services/gemini.ts</code>.</li>
                          </ol>
                      </div>
                  )}
              </div>
          </div>
      </div>
      )}

      {/* Data Management */}
      <div className="glass-panel p-4 md:p-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Database size={20} className="text-white" />
              Data Management
          </h3>
          <p className="text-gray-400 text-sm mb-4">
              Upload your initial workout/diet plan (from data.md) to your online account.
          </p>
          <button className="btn-primary flex items-center gap-2 bg-white text-black hover:bg-gray-200">
              <Save size={18} />
              Upload Initial Data to Cloud
          </button>
      </div>
    </div>
  );
}
