import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";

const solutionOptions = [
  "🗣️ Talk to her and apologize sincerely",
  "🎁 Plan a cute surprise to make up",
  "✍️ Write a heartfelt letter",
  "🕊️ Give her space and time",
  "🤝 Promise to work on it",
  "☕ Discuss openly and calmly",
  "💐 Do a small act of kindness"
];

const moodOptions = [
  "😊 Happy",
  "😔 Sad",
  "😤 Frustrated",
  "🥺 Hurt",
  "😡 Angry",
  "😕 Confused",
  "❤️ Loving"
];

async function sendEmail({ name, message, solution, mood, timestamp }) {
  try {
    await fetch("/api/send-grievance-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, message, solution, mood, timestamp }),
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export default function GrievanceBox() {
  const [grievances, setGrievances] = useState([]);
  const [message, setMessage] = useState("");
  const [solution, setSolution] = useState(solutionOptions[0]);
  const [mood, setMood] = useState(moodOptions[0]);

  const handleSubmit = async () => {
    if (!message) return;
    const newEntry = {
      id: Date.now(),
      name: "Gargi",
      message,
      solution,
      mood,
      timestamp: new Date().toLocaleString(),
    };
    setGrievances([newEntry, ...grievances]);
    setMessage("");
    setSolution(solutionOptions[0]);
    setMood(moodOptions[0]);
    await sendEmail(newEntry);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex flex-col items-center p-4">
      <motion.h1 
        className="text-4xl font-bold text-rose-600 mt-8 mb-2 text-center"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}>
        <Sparkles className="inline-block w-6 h-6 mr-2 text-yellow-400 animate-pulse" />
        Gargi's Grievance Corner
      </motion.h1>
      <p className="text-center text-rose-500 italic mb-4">Every little feeling matters, and I'm here to listen with all my heart 💖</p>
      <Card className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex justify-center">
          <img
            src="/gargi.png"
            alt="Gargi smiling in garden"
            className="rounded-xl shadow-md w-full h-auto max-w-sm border-4 border-rose-300"
          />
        </div>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            placeholder="Tell me what’s on your heart 💌"
            value={message}
            rows={4}
            className="border-pink-300 focus:ring-rose-400"
            onChange={(e) => setMessage(e.target.value)}
          />
          <select
            className="p-2 rounded-md border border-gray-300"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            {moodOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <select
            className="p-2 rounded-md border border-gray-300"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          >
            {solutionOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <Button className="bg-rose-500 hover:bg-rose-600 text-white" onClick={handleSubmit}>
            Send to My ❤️
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 w-full max-w-xl space-y-4">
        {grievances.map((g) => (
          <motion.div
            key={g.id}
            className="bg-white p-4 shadow-lg rounded-xl border-l-4 border-rose-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-500">{g.timestamp}</p>
            <p className="font-semibold text-rose-600">{g.name} says:</p>
            <p className="mt-1 text-gray-700 italic">"{g.message}"</p>
            <p className="mt-2 text-sm text-gray-800">💡 Suggested Action: <span className="font-medium text-green-700">{g.solution}</span></p>
            <p className="text-sm">🌈 Mood: <span className="text-rose-500 font-medium">{g.mood}</span></p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
