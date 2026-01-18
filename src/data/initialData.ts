export const initialUserProfile = {
  name: "Gourav Jangra",
  currentWeight: 68,
  goals: [
    "Build lean muscle (athletic physique)",
    "Improve chest (inner + upper chest fullness)",
    "Reduce stomach and overall body fat",
    "Improve posture",
    "Improve stamina",
    "Achieve multiple pull-ups",
    "Track weekly progress photos",
  ],
  dietType: "Pure Vegetarian",
  workoutTime: "19:00", // 7:00 
  waterTarget: 3500, // ml
};

export const workoutSchedule = {
  Monday: {
    focus: "Push (Chest Focus + Triceps + Shoulders)",
    exercises: [
      { name: "Incline Dumbbell Press", sets: "4", reps: "8–10" },
      { name: "Flat Dumbbell Bench Press", sets: "3", reps: "8–10" },
      { name: "Overhead Barbell Press", sets: "3", reps: "8–12" },
      { name: "Cable Fly (Mid Height)", sets: "3", reps: "12–15 (Squeeze)" },
      { name: "Lateral Raise", sets: "4", reps: "12–15" },
      { name: "Rope Pushdown", sets: "3", reps: "12–15" },
      { name: "Plank", sets: "3", reps: "45-60 sec" },
    ],
  },
  Tuesday: {
    focus: "Pull (Back Width + Thickness + Biceps)",
    exercises: [
      { name: "Pull-ups (or Assisted)", sets: "4", reps: "6–10" },
      { name: "Barbell Bent Over Row", sets: "3", reps: "8–10" },
      { name: "Lat Pulldown (Wide Grip)", sets: "3", reps: "10–12" },
      { name: "Face Pulls", sets: "4", reps: "15 (Posture)" },
      { name: "Hammer Curls", sets: "3", reps: "10–12" },
      { name: "Barbell Curls", sets: "3", reps: "10–12" },
      { name: "Dead Hang", sets: "3", reps: "Max Time" },
    ],
  },
  Wednesday: {
    focus: "Legs (Quads + Hams + Calves)",
    exercises: [
      { name: "Barbell Squats", sets: "3", reps: "6–10" },
      { name: "Leg Press", sets: "3", reps: "10–12" },
      { name: "Romanian Deadlift", sets: "3", reps: "10–12" },
      { name: "Walking Lunges", sets: "3", reps: "12 Steps/Leg" },
      { name: "Leg Curls", sets: "3", reps: "12–15" },
      { name: "Standing Calf Raises", sets: "4", reps: "15–20" },
    ],
  },
  Thursday: {
    focus: "Push (Shoulder Focus + Upper Chest + Triceps)",
    exercises: [
      { name: "Seated Dumbbell Shoulder Press", sets: "4", reps: "8–10" },
      { name: "Incline Dumbbell Fly", sets: "3", reps: "10–12" },
      { name: "Chest Dips (Weighted if easy)", sets: "3", reps: "8–12" },
      { name: "Lateral Raise (Cable or DB)", sets: "4", reps: "15" },
      { name: "Skull Crushers", sets: "3", reps: "10–12" },
      { name: "Tricep Overhead Extension", sets: "3", reps: "12–15" },
      { name: "Hanging Leg Raise", sets: "3", reps: "10–15" },
    ],
  },
  Friday: {
    focus: "Pull (Thickness Focus + Rear Delts + Biceps)",
    exercises: [
      { name: "Deadlift (Conventional)", sets: "3", reps: "5–8" },
      { name: "Seated Cable Row", sets: "3", reps: "10–12" },
      { name: "Single Arm Dumbbell Row", sets: "3", reps: "10-12/side" },
      { name: "Rear Delt Fly (Reverse Peck Deck)", sets: "3", reps: "15" },
      { name: "Incline Dumbbell Curls", sets: "3", reps: "10–12" },
      { name: "Cable Bicep Curls", sets: "3", reps: "12–15" },
      { name: "Shrugs", sets: "3", reps: "12–15" },
    ],
  },
  Saturday: {
    focus: "Legs + Weak Point Training (Abs/Forearms)",
    exercises: [
      { name: "Goblet Squats", sets: "3", reps: "10–12" },
      { name: "Bulgarian Split Squats", sets: "3", reps: "8–10/leg" },
      { name: "Leg Extensions", sets: "3", reps: "12–15" },
      { name: "Seated Calf Raises", sets: "4", reps: "15–20" },
      { name: "Farmer's Walk", sets: "3", reps: "45-60 sec" },
      { name: "Russian Twists", sets: "3", reps: "20 reps" },
    ],
  },
  Sunday: {
    focus: "Rest / Active Recovery",
    exercises: [
      { name: "Light Walk (Nature)", sets: "1", reps: "45 mins" },
      { name: "Full Body Stretching", sets: "1", reps: "20 mins" },
      { name: "Foam Rolling", sets: "1", reps: "15 mins" },
    ],
  },
};

export const dietPlan = [
  {
    meal: "Breakfast (Power Smoothie)",
    items: [
      "Oats (60g)",
      "Milk (250ml)",
      "Whey Protein (1 Scoop)",
      "Almonds (10g)",
      "Blend all together",
    ],
    calories: 560,
    protein: 42,
    carbs: 57,
    fats: 18,
  },
  {
    meal: "Lunch (Indian Muscle Builder)",
    items: [
      "Soya Chunks Curry (50g dry chunks)",
      "Rice (1 large cup) OR 3 Rotis",
      "Seasonal Sabzi + Salad",
      "Curd / Yogurt (100g)",
    ],
    calories: 640,
    protein: 42,
    carbs: 97,
    fats: 8,
  },
  {
    meal: "Evening Snack (Pre-Workout)",
    items: [
      "2 Brown Bread slices + Peanut Butter",
      "OR 1 Banana + Roasted Chana",
      "Black Coffee (Optional)",
    ],
    calories: 430,
    protein: 15,
    carbs: 63,
    fats: 17,
  },
  {
    meal: "Dinner (Light & Protein)",
    items: [
      "Paneer Bhurji / Sabzi (100g Paneer)",
      "2 Rotis",
      "Cucumber/Tomato Salad",
    ],
    calories: 590,
    protein: 26,
    carbs: 50,
    fats: 32,
  },
];
