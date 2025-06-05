import Sidebar from "@/components/Sidebar";

const InfoPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10 text-white max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8">Who is Ezell Brown?</h1>
        <p className="mb-6 text-lg leading-relaxed">
          DJ. Musician. Multi-instrumentalist. Vibe architect.
          <br />
          Ezell's been crafting soundscapes for years—mixing genres, remixing classics,
          and building beats that move people. He co-founded <strong>BeachParty Records</strong> in LA,
          a label built on freedom, energy, and community.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">This Site? It’s a Vibe Hub.</h2>
        <p className="mb-6 text-lg leading-relaxed">
          If you love real music, raw energy, and no-fake-zone dance floors—you’re home.
          <br />
          Here, you’ll find Ezell’s original tracks, remixes, and exclusive sets.
          Stream anytime. Catch the vibe on demand.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">Catch Him Live.</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Ezell hosts DJ events where the goal is simple: forget the world and just dance.
          Safe, fun, high-vibe spaces where bills, stress, and drama don’t exist.
          <br />
          Want him at your event? He’s bookable—head over to the <strong>Booking</strong> tab to lock in a date.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">Join the Movement.</h2>
        <p className="text-lg leading-relaxed">
          Sign up for the list. Get updates, event drops, new mixes, and more.
          <br />
          This isn’t just music. It’s a culture.
          <br />
          Be part of it—or wonder what you missed. Head over to the <strong>Home</strong> tab and join the mailing list.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;
