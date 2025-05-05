import MailingListForm from '@/components/MailingListForm';
import Player from '@/components/Player';
import SongCarousel from '@/components/SongCarousel';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1d1a1a] via-[#301e1f] to-[#1a1d1f] text-amber-100 flex flex-col items-center font-retro">

      <div className="w-full max-w-2xl p-4">
        <Player />
        <SongCarousel />
        <MailingListForm />
      </div>
    </main>
  );
}
