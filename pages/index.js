import { useState } from "react";

export default function Home() {
  const [concern, setConcern] = useState("");
  const [action, setAction] = useState("");
  const [mood, setMood] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concern, action, mood }),
    });

    if (res.ok) {
      setStatus("💌 Sent successfully to your love!");
    } else {
      setStatus("❌ Failed to send. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl gap-6">

        {/* Left side image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src="/gargi.png"
            alt="Gargi"
            className="
              w-full 
              max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px]
              h-auto 
              rounded-2xl shadow-lg object-cover
              transition-all duration-300
            "
          />
        </div>

        {/* Right side form */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-pink-600 mb-4">
              Dear Gargi 💖
            </h1>
            <p className="mb-4 text-gray-600">
              Share your heart here, I’m always listening 💌
            </p>

            <label className="block mb-2">Your Mood 🌸</label>
            <select
              className="w-full p-2 mb-4 border rounded-lg"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Select Mood</option>
              <option>😊 Happy</option>
              <option>🥺 Sad</option>
              <option>😡 Angry</option>
              <option>😴 Tired</option>
              <option>❤️ Loved</option>
            </select>

            <label className="block mb-2">Your Concern 💭</label>
            <textarea
              className="w-full p-2 mb-4 border rounded-lg"
              rows="4"
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
            />

            <label className="block mb-2">Suggested Action 🌹</label>
            <select
              className="w-full p-2 mb-4 border rounded-lg"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="">Choose Action</option>
              <option>💐 Bring me flowers</option>
              <option>🍫 Buy me chocolates</option>
              <option>📞 Call me</option>
              <option>🤗 Hug me tight</option>
              <option>💌 Write me a letter</option>
            </select>
          </div>

          <div>
            <button
              onClick={sendEmail}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg w-full"
            >
              Send to My Love ❤️
            </button>
            {status && <p className="mt-4 text-pink-700">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
