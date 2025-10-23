// import MailingListForm from '@/components/MailingListForm';
// import Navbar from '@/components/Navbar';

// export default function Signup() {
//   return (
//     <main className="flex min-h-screen items-center justify-center from-yellow-100 to-yellow-300">
//       <MailingListForm />
//       <Navbar />
//     </main>
//   );
// }
// code above works, needs styling===================================================================================
// ====================================================================================================
import MailingListForm from '@/components/MailingListForm';
import Navbar from '@/components/Navbar';

export default function Signup() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center  text-white overflow-hidden">
      <Navbar />

      {/* Subtle animated gradient background */}
     
      <MailingListForm />
    </main>
  );
}

