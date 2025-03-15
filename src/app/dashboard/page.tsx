import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOut } from "@/components/sign-out";
import { COPYRIGHT_YEAR, APP_NAME } from "@/constants/constants";
import ReminderCard from "@/components/dashboard/ReminderCard";
import EventCard from "@/components/dashboard/EventCard";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import MyResponsiveLine from "@/components/dashboard/charts/LineChart";
import MiniEventCard from "@/components/dashboard/events/current/MiniEventCard";
import MyResponsivePie from "@/components/dashboard/charts/PieChart";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <p className="text-gray-600">Você precisa estar logado para acessar o dashboard.</p>
        <Link href="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header session={session} />
        <main className="flex-grow p-4 bg-gray-50">
          {/* Primeira linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Eventos em andamento */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Eventos em andamento</h2>
              <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
                <MiniEventCard name="Churras do seu Jorge" totalParticipants={20} confirmedParticipants={15} status="Em andamento" />
              </div>
            </div>

            {/* Quantidade de eventos por mês */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Quantidade de eventos por mês</h2>
              <div className="h-60 overflow-hidden">
                <MyResponsiveLine />
              </div>
            </div>

            {/* Espaço reservado */}
            <div className="bg-white shadow rounded-lg p-4 flex items-center justify-center">
              <MyResponsivePie />
            </div>
          </div>

          {/* Segunda linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Eventos futuros */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Eventos futuros</h2>
              <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
                <EventCard title="Festa de aniversário" location="R. Nicarágua, 1226 - Nova Porto Velho, Porto Velho - RO, 76820-830" status="upcoming" participants={37} maxParticipants={40} />
              </div>
            </div>

            {/* Lembretes */}
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-bold">Lembretes</h2>
              <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
                <ReminderCard title="Monitorar a carne" description="Certificar-se de que não vai faltar carne." />
                <ReminderCard title="Monitorar bebidas" description="Certificar-se de que tudo está servido no tempo certo." />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

const Header = ({ session }) => {
  return (
    <header className="bg-blue-500 p-4 text-white flex flex-col md:flex-row justify-between items-center border-b w-full">
      <Button className="mb-2 md:mb-0">Criar evento</Button>
      <div className="flex items-center">
        <p className="mr-4 text-sm md:text-base">Logado como: {session.user?.email}</p>
        <SignOut />
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-blue-500 p-4 text-white text-center w-full">
    <p>&copy; {COPYRIGHT_YEAR} {APP_NAME}. Todos os direitos reservados.</p>
  </footer>
);

export default DashboardPage;
