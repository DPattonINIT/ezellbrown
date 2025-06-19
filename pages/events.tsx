import Sidebar from "@/components/Sidebar";

const EventsPage = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1 p-10 mt-16 text-white max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 border-b border-gray-700 pb-4">
          Upcoming Events
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/*Event Card */}
          <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-2xl font-semibold mb-2">Check Out Our UpComing Events</h2>
            <p className="mb-4 text-gray-300">View the latest events, appearances, and pop-ups.</p>
            <a
              href="https://partiful.com/e/8zDOjRozGJlWJAphbTef"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
            >
              RSVP / Book Now
            </a>
          </div>

          {/* duplicate this block for more events */}
        </div>

        <p className="mt-12 text-center text-gray-400 text-sm">
          More dates coming soon. Stay tuned & follow on socials for updates.
        </p>
      </div>
    </div>
  );
};

export default EventsPage;
