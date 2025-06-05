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
          Ezell&rsquo;s been crafting soundscapes for years—mixing genres, remixing classics,
          and building beats that move people. He co-founded <strong>BeachParty Records</strong> in LA,
          a label built on freedom, energy, and community.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">This Site? It&rsquo;s a Vibe Hub.</h2>
        <p className="mb-6 text-lg leading-relaxed">
          If you love real music, raw energy, and no-fake-zone dance floors—you&rsquo;re home.
          <br />
          Here, you&rsquo;ll find Ezell&rsquo;s original tracks, remixes, and exclusive sets.
          Stream anytime. Catch the vibe on demand.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">Catch Him Live.</h2>
        <p className="mb-6 text-lg leading-relaxed">
          Ezell hosts DJ events where the goal is simple: forget the world and just dance.
          Safe, fun, high-vibe spaces where bills, stress, and drama don&rsquo;t exist.
          <br />
          Want him at your event? He&rsquo;s bookable—head over to the Booking tab to lock in a date.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-10">Join the Movement.</h2>
        <p className="text-lg leading-relaxed">
          Sign up for the list. Get updates, event drops, new mixes, and more.
          <br />
          This isn&rsquo;t just music. It&rsquo;s a culture.
          <br />
          Be part of it—or wonder what you missed. Head over to the Home tab and join the mailing list.
        </p>
      </div>
    </div>
  );
};

export default InfoPage;
