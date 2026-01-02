import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50">
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-indigo-600">
          LocationChat
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-indigo-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            🔒 Location Verified Chats
          </span>

          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Chat with people <br />
            <span className="text-indigo-600">near you</span>, instantly.
          </h2>

          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            LocationChat lets you join real-time chatrooms based on your
            location. No fake profiles. No endless chats.
            <strong className="text-gray-900">
              {" "}
              Real people, real places.
            </strong>
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition shadow-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-xl text-lg font-semibold text-gray-800 hover:border-indigo-600 hover:text-indigo-600 transition"
            >
              Login
            </Link>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            No spam • Chats auto-expire • Location protected
          </p>
        </div>

        {/* HERO IMAGE / CARD */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-6 border">
            <p className="text-sm text-gray-500 mb-2">📍 Nearby Chatroom</p>
            <h3 className="text-xl font-bold text-gray-900">Coimbatore Tech</h3>
            <p className="text-gray-600 mt-1">
              Radius: 2 km • 23 people online
            </p>

            <div className="mt-4 space-y-2">
              <div className="bg-gray-100 p-3 rounded-lg text-sm">
                <strong>Arun:</strong> Anyone attending the meetup?
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg text-sm">
                <strong>You:</strong> Yes! On my way 🚶‍♂️
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              ⏱ Chat expires in 1h 42m
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-4xl font-extrabold text-center text-gray-900">
            Why LocationChat?
          </h3>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Designed for authenticity, privacy, and real-world interaction.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Location-Based Rooms",
                desc: "Join chatrooms only if you're physically within range.",
                icon: "📍",
              },
              {
                title: "Auto-Expiring Chats",
                desc: "No permanent history. Chats disappear automatically.",
                icon: "⏳",
              },
              {
                title: "Verified Users",
                desc: "JWT + secure auth ensures trusted participants.",
                icon: "🔐",
              },
              {
                title: "Real-Time Messaging",
                desc: "Powered by WebSockets for instant delivery.",
                icon: "⚡",
              },
              {
                title: "Privacy First",
                desc: "No tracking. No unnecessary data stored.",
                icon: "🛡️",
              },
              {
                title: "Simple & Fast",
                desc: "No clutter. Just chat and connect locally.",
                icon: "✨",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition"
              >
                <div className="text-3xl">{f.icon}</div>
                <h4 className="mt-4 text-xl font-bold text-gray-900">
                  {f.title}
                </h4>
                <p className="mt-2 text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20 text-center">
        <h3 className="text-4xl font-extrabold text-white">
          Ready to chat locally?
        </h3>
        <p className="mt-4 text-indigo-100 text-lg">
          Join nearby conversations before they disappear.
        </p>

        <Link
          to="/signup"
          className="inline-block mt-8 bg-white text-indigo-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition shadow-lg"
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>
          © {new Date().getFullYear()} LocationChat • Built for real-world
          connections
        </p>
      </footer>
    </div>
  );
}
