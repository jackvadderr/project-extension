import ReminderCard from "@/components/dashboard/dashboard/cards/todo_list/ReminderCard";
import EventCard from "@/components/dashboard/dashboard/cards/events/future/EventCard";
import MyResponsiveLine from "@/components/dashboard/dashboard/charts/LineChart";
import MiniEventCard from "@/components/dashboard/dashboard/cards/events/current/MiniEventCard";
import MyResponsivePie from "@/components/dashboard/dashboard/charts/PieChart";



const DashboardPage = () => {
  return (
    <>
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

        {/* Distribuição de eventos */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Distribuição de eventos</h2>
          <div className="h-60 overflow-hidden">
            <MyResponsivePie />
          </div>
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
    </>
  );
};

export default DashboardPage;
