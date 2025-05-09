import MailingListForm from '@/components/MailingListForm';
import Player from '@/components/Player';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-amber-100 flex flex-col items-center px-4 py-12 font-sans">

     
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/images/beachvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

     
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-0" />

    
      <h1 className="brand-font text-5xl md:text-6xl text-yellow-300 z-10 drop-shadow-lg mb-8 text-center">
        Beach Party FM
      </h1>

      
      <div className="relative z-10 w-[95%] max-w-6xl bg-amber-50/20 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-yellow-300 overflow-hidden">
        <Player />
        <MailingListForm />
      </div>
    </main>
  );
}
