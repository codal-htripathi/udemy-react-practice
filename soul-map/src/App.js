import React, { useEffect, useState } from "react";
import { Sparkles, Globe2, Trophy } from "lucide-react";

const questions = [
  {
    question: "₹1 Crore just landed in your account. Your phone is in your hand. What do you do next?",
    options: [
      { text: "Book a one-way ticket to Tokyo — new city, new me, no explanations", country: "Japan" },
      { text: "Screenshot the balance, send it to no one, and start looking at penthouses in Dubai", country: "United Arab Emirates" },
      { text: "Open a laptop, register a company name, and call it a business expense", country: "United States" },
      { text: "Tell nobody. Pack a bag. Disappear into the mountains for a month first", country: "India" },
    ],
  },
  {
    question: "It's 2AM and you still can't sleep. What's actually keeping you up?",
    options: [
      { text: "A lo-fi playlist, a half-read manga, and thoughts too aesthetic to explain", country: "Japan" },
      { text: "Planning something so big that even you think you're delusional", country: "United Arab Emirates" },
      { text: "A business idea, three open tabs, and the belief that sleep is for the average", country: "United States" },
      { text: "Just staring at the ceiling, feeling everything, thinking about nothing", country: "Switzerland" },
    ],
  },
  {
    question: "You have one completely free Saturday — no responsibilities, no obligations. The day is yours. What happens?",
    options: [
      { text: "Walk alone through a quiet part of the city with earphones in and no destination", country: "Japan" },
      { text: "Dress up for no reason and eat somewhere unreasonably expensive", country: "United Arab Emirates" },
      { text: "Wake up at 6AM, hit the gym, meal prep, and call it self-improvement", country: "United States" },
      { text: "Drive somewhere with a view, sit in silence, and actually feel like yourself", country: "Switzerland" },
    ],
  },
  {
    question: "A stranger sits next to you on a long flight. They start talking. What's your honest reaction?",
    options: [
      { text: "Politely smile, put one earbud back in, and hope they get the hint", country: "Japan" },
      { text: "Immediately clock their watch, their shoes, and decide if this conversation is worth it", country: "United Arab Emirates" },
      { text: "Lean in — you've made a lifelong contact before landing, guaranteed", country: "United States" },
      { text: "Happy to talk, but you secretly wish you were just watching the clouds alone", country: "Switzerland" },
    ],
  },
  {
    question: "Someone broke your trust badly. How do you actually handle it?",
    options: [
      { text: "Go completely quiet. Remove them slowly. Never explain why", country: "Japan" },
      { text: "Cut them off instantly and make sure your next move makes them regret it", country: "United Arab Emirates" },
      { text: "Confront them directly, say exactly what you think, and move on fast", country: "United States" },
      { text: "Take a long walk, process it alone, and eventually forgive — but never forget", country: "Switzerland" },
    ],
  },
  {
    question: "Your dream apartment exists. Describe it honestly.",
    options: [
      { text: "Small, cozy, and perfectly organised — rain outside, warm light inside, cat on the shelf", country: "Japan" },
      { text: "Floor-to-ceiling glass, city skyline, minimalist furniture that costs more than most cars", country: "United Arab Emirates" },
      { text: "Open-plan loft in a buzzing city — the kind of place where ideas happen at midnight", country: "United States" },
      { text: "Stone cottage near a lake, fireplace, no neighbors visible, very fast WiFi", country: "Switzerland" },
    ],
  },
  {
    question: "You're having the worst week of your life. What actually makes it better?",
    options: [
      { text: "A convenience store at midnight, warm canned coffee, and no one asking if you're okay", country: "Japan" },
      { text: "Booking something expensive and telling yourself you deserved it anyway", country: "United Arab Emirates" },
      { text: "Working harder — channelling it all into something productive and coming out on top", country: "United States" },
      { text: "Getting into nature. Fresh air, silence, and a long walk that nobody knows you're on", country: "Switzerland" },
    ],
  },
  {
    question: "What does success actually look like to you — be honest?",
    options: [
      { text: "A peaceful life with enough money to never feel rushed, and time to do things properly", country: "Japan" },
      { text: "A name people recognise, an address that impresses, and a life that looks as good as it feels", country: "United Arab Emirates" },
      { text: "Building something from nothing that changes an industry — and being the one who did it", country: "United States" },
      { text: "Freedom. Waking up without dread and choosing your day, every day", country: "Switzerland" },
    ],
  },
  {
    question: "You have one hour to kill in an airport. What are you actually doing?",
    options: [
      { text: "Finding the most interesting food court option and eating alone with a book", country: "Japan" },
      { text: "Already in the lounge. Already ordered a drink. Already upgraded the seat", country: "United Arab Emirates" },
      { text: "Answering emails, making a call, turning transit time into productive time", country: "United States" },
      { text: "Sitting by the window watching planes, completely zoned out, completely at peace", country: "Switzerland" },
    ],
  },
  {
    question: "The universe gives you one superpower — but it has to match your personality. Which one fits?",
    options: [
      { text: "The ability to read exactly what someone is feeling without them saying a word", country: "Japan" },
      { text: "Manifesting wealth — whatever you picture clearly, you attract without effort", country: "United Arab Emirates" },
      { text: "Unshakeable confidence — every room you enter, every pitch you make, you never doubt yourself", country: "United States" },
      { text: "Slowing time — stretching peaceful moments so they last as long as you want", country: "Switzerland" },
    ],
  },
  {
    question: "Your friend group is planning a trip. You get to pick the vibe. What do you choose?",
    options: [
      { text: "Seven days in Japan — slow days, good food, train rides, zero agenda", country: "Japan" },
      { text: "Four nights in Dubai — rooftop dinners, desert at sunrise, staying somewhere ridiculous", country: "United Arab Emirates" },
      { text: "New York or LA — packed itinerary, something new every three hours, sleep when you're home", country: "United States" },
      { text: "Swiss Alps — rent a cabin, cook together, hike once, sit by a fire every night", country: "Switzerland" },
    ],
  },
  {
    question: "Someone asks you to describe yourself in one sentence. What do you actually say?",
    options: [
      { text: "'I notice things most people walk past, and I feel things I never quite say out loud'", country: "Japan" },
      { text: "'I want the best version of everything — life, work, the table at a restaurant, all of it'", country: "United Arab Emirates" },
      { text: "'I'm the person who bets on myself when nobody else will and usually wins'", country: "United States" },
      { text: "'I don't need much — I just need it to be real, quiet, and mine'", country: "Switzerland" },
    ],
  },
  {
    question: "It's your last meal on earth. What are you actually eating?",
    options: [
      { text: "A perfect bowl of ramen at a tiny counter in the rain — twelve seats, no menu in English", country: "Japan" },
      { text: "Something gold-plated and expensive that arrives under a dome with theatrical smoke", country: "United Arab Emirates" },
      { text: "An insane burger at a diner that's been open since 1962 — fries, shake, no regrets", country: "United States" },
      { text: "Cheese fondue next to a fire with snow falling outside — simple, warm, and perfect", country: "Switzerland" },
    ],
  },
  {
    question: "Which version of a rainy day speaks to your soul?",
    options: [
      { text: "Watching it from a window with tea, a playlist, and nowhere to be — pure comfort", country: "Japan" },
      { text: "Stuck inside a beautiful hotel you booked on a whim, room service arriving, no complaints", country: "United Arab Emirates" },
      { text: "You didn't notice it was raining — you were already deep in work and didn't look up for hours", country: "United States" },
      { text: "Rain on a mountain cabin roof. Coffee getting cold. You don't care. This is everything", country: "Switzerland" },
    ],
  },
  {
    question: "Deep down, what are you actually searching for in life?",
    options: [
      { text: "To understand yourself completely — every quiet feeling, every contradiction, every layer", country: "India" },
      { text: "A version of yourself so elevated that even you from five years ago wouldn't recognise it", country: "United Arab Emirates" },
      { text: "To build something that outlasts you — a legacy, a company, a movement, a name", country: "United States" },
      { text: "A life so simple and honest it needs no explaining to anyone", country: "Switzerland" },
    ],
  },
  {
    question: "You're alone on a rooftop at night. The city is below you. What are you thinking?",
    options: [
      { text: "Nothing specific — just feeling the weight of everything and somehow finding it beautiful", country: "Japan" },
      { text: "How to get to a higher rooftop. A better city. A bigger life. Always bigger", country: "United Arab Emirates" },
      { text: "Exactly how you're going to make the next five years different from the last five", country: "United States" },
      { text: "That you wish more people could see that real life doesn't need to be this loud", country: "India" },
    ],
  },
];

// ── Calls Claude API to generate a personalised result description ──
async function fetchPersonalisedResult(winnerCountry, chosenAnswers) {
  const answerSummary = chosenAnswers
    .map((a, i) => `Q${i + 1}: "${a.text}" (→ ${a.country})`)
    .join("\n");

  const prompt = `You are a witty, dramatic personality quiz analyst. A user just completed a "Which Country Does Your Soul Belong To?" quiz and their result is ${winnerCountry}.

Here are all their chosen answers:
${answerSummary}

Based on their specific answers, write a personalised result in this EXACT JSON format (no markdown, no backticks, just raw JSON):
{
  "text": "2-3 sentences about why their soul belongs to ${winnerCountry}, referencing 1-2 of their specific answer choices to make it feel personal. Be dramatic and poetic.",
  "fact": "One genuinely surprising or funny fact about ${winnerCountry} that would resonate with this specific person based on their answers.",
  "joke": "A funny, relatable one-liner prediction about this person based on their answer patterns. Max 20 words. No emojis.",
  "food": "A comfort food from ${winnerCountry} that matches their vibe. Format: 'Food name + short emoji'",
  "animal": "A spirit animal that matches their answer patterns (can be different from the default for ${winnerCountry}). Format: 'Animal name — one adjective + emoji'"
}`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const raw = data.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultCountry, setResultCountry] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [aiDescription, setAiDescription] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);
  const [loadingStage, setLoadingStage] = useState("analyzing");

  const handleAnswer = (option) => {
    const updated = [...answers, option];
    setAnswers(updated);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(updated);
    }
  };

  const calculateResult = (allAnswers) => {
    const counts = {};
    allAnswers.forEach(({ country }) => {
      counts[country] = (counts[country] || 0) + 1;
    });
    const winner = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    setLoadingResult(true);
    setLoadingStage("analyzing");
    setResultCountry(winner);
  };

  // Fetch country data + AI description in parallel once winner is known
  useEffect(() => {
    if (!resultCountry) return;

    setLoadingStage("analyzing");

    const countryFetch = fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(resultCountry)}`
    ).then((r) => r.json());

    setLoadingStage("writing");
    const aiFetch = fetchPersonalisedResult(resultCountry, answers);

    Promise.all([countryFetch, aiFetch]).then(([countryJson, aiData]) => {
      setCountryData(countryJson[0]);
      setAiDescription(aiData);
      setLoadingResult(false);
    });
  }, [resultCountry]);

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResultCountry(null);
    setCountryData(null);
    setAiDescription(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const loadingMessages = {
    analyzing: "Analyzing your soul...",
    writing: "Writing your personal story...",
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center px-4 py-10">
      {/* Background glows */}
      <div className="absolute w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl bottom-[-100px] right-[-100px]" />

      {/* Quiz */}
      {!resultCountry && !loadingResult && (
        <div className="relative z-10 w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Sparkles className="text-pink-400" />
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">
                SoulMap
              </h1>
            </div>
            <p className="text-gray-300 text-lg">
              Discover the country your soul truly belongs to ✨
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestion + 1}/{questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="group text-left bg-white/5 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 p-5 rounded-2xl transition-all duration-300 hover:scale-[1.03] border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg">{option.text}</span>
                    <Globe2 className="opacity-40 group-hover:opacity-100 transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            🌍 87,000+ people discovered their soul country
          </div>
        </div>
      )}

      {/* Loading */}
      {loadingResult && (
        <div className="text-center z-10">
          <div className="text-7xl animate-pulse mb-8">🌍</div>
          <h2 className="text-4xl font-black mb-4">
            {loadingMessages[loadingStage]}
          </h2>
          <p className="text-gray-400 text-lg">
            {loadingStage === "analyzing"
              ? "Matching your personality with the world"
              : "Crafting a story written just for you"}
          </p>
        </div>
      )}

      {/* Result */}
      {countryData && aiDescription && !loadingResult && (
        <div className="relative z-10 w-full max-w-3xl">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-[2px] rounded-[32px]">
            <div className="bg-black rounded-[30px] p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <img
                  src={countryData.flags.svg}
                  alt="flag"
                  className="w-24 h-24 object-cover rounded-full shadow-2xl"
                />
                <div className="w-24 h-24 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-4xl font-black shadow-2xl">
                  {Object.values(countryData.currencies || {})[0]?.symbol}
                </div>
              </div>

              <h2 className="text-5xl md:text-6xl font-black mb-6">
                {countryData.name.common}
              </h2>

              <div className="space-y-6 mb-10">
                {/* AI-generated personalised text */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {aiDescription.text}
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                  <h3 className="text-xl font-bold mb-2">🌍 Amazing Fact</h3>
                  <p className="text-gray-300">{aiDescription.fact}</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left">
                  <h3 className="text-xl font-bold mb-2">😂 SoulMap Prediction</h3>
                  <p className="text-gray-300">{aiDescription.joke}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-5">
                    <h3 className="text-lg font-bold mb-2">🍜 Soul Food</h3>
                    <p className="text-gray-300">{aiDescription.food}</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5">
                    <h3 className="text-lg font-bold mb-2">🐾 Spirit Animal</h3>
                    <p className="text-gray-300">{aiDescription.animal}</p>
                  </div>
                </div>
              </div>

              {/* Country Stats from REST Countries API */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Capital</h3>
                  <p className="font-bold">{countryData.capital?.[0]}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Population</h3>
                  <p className="font-bold">
                    {(countryData.population / 1_000_000).toFixed(1)}M
                  </p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Region</h3>
                  <p className="font-bold">{countryData.region}</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4">
                  <h3 className="text-gray-400 text-sm mb-1">Soul Match</h3>
                  <p className="font-bold">
                    {90 + Math.floor(Math.random() * 10)}%
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 mb-8">
                <Trophy className="text-yellow-400" />
                <span className="text-lg">
                  Only 8% of users matched with {countryData.name.common}
                </span>
              </div>

              <button
                onClick={restartQuiz}
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
              >
                Discover Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}