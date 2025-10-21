import MailingListForm from '@/components/MailingListForm';
import Sidebar from '@/components/Sidebar';

export default function Signup() {
  return (
    <main className="flex min-h-screen items-center justify-center from-yellow-100 to-yellow-300">
      <MailingListForm />
      <Sidebar />
    </main>
  );
}
