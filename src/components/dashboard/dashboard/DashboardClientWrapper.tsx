'use client'

import EventListCard from '@/components/dashboard/dashboard/cards/events/future/EventCard'
import MiniEventCardPage from '@/components/dashboard/dashboard/MiniEventCardPage'
import EventsByMonthChart from '@/components/dashboard/dashboard/charts/LineChart'
import EventDistribution from '@/components/dashboard/dashboard/charts/PieChart'
import { EventCardProps } from '@/types/EventCardProps'
import TodoListWrapper from '@/components/dashboard/dashboard/TodoListClient';
import SimpleCalendarCard from './calendar/CalendarStatusCard';
import { Task, Prisma } from '@prisma/client';

interface Props {
  onGoingEvents:any;
  eventsByMonthFormatted: any;
  eventsDistribuitionFormatted: { name: string; value: number }[];
  eventsFutureFormatted: EventCardProps[];
  tasks: Task[];
  createTask: (data: Prisma.TaskCreateInput) => Promise<Task>;
  updateTask: (id: string, data: Partial<Prisma.TaskUpdateInput>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<void>;
  scheduledDates: string[];
}
export default function DashboardClientWrapper({
                                                 onGoingEvents,
                                                 eventsByMonthFormatted,
                                                 eventsDistribuitionFormatted,
                                                 eventsFutureFormatted,
                                                 tasks,
                                                 createTask,
                                                 updateTask,
                                                 deleteTask,
                                                 scheduledDates
                                               }: Props) {
  // const scheduledDates = ['2025-04-10', '2025-04-15', '2025-04-21'];
  const blockedDates: string[] = [];

  return (
    <>
      {/* Primeira linha */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
        {/* Primeiro card (um pouco menor que os outros) */}
        <div className="bg-white shadow rounded-2xl p-4 md:col-span-1">
          <h2 className="text-xl font-bold">Eventos em andamento</h2>
          <div className="grid gap-4 mt-4 h-64 overflow-auto">
            <MiniEventCardPage events={onGoingEvents} />
          </div>
        </div>

        {/* Cards principais (maiores) */}
        <div className="bg-white shadow rounded-2xl p-4 md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold">Calendário</h2>
          <div className="h-80 overflow-hidden">
            <SimpleCalendarCard
              // scheduledDates={['2025-04-10', '2025-04-15', '2025-04-21']}
              scheduledDates={scheduledDates}
              blockedDates={blockedDates}
            />
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold">Quantidade de eventos por mês</h2>
          <div className="h-80 overflow-hidden">
            <EventsByMonthChart data={eventsByMonthFormatted} />
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4 md:col-span-1 lg:col-span-1">
          <h2 className="text-xl font-bold">Distribuição de eventos</h2>
          <div className="h-80 overflow-hidden">
            <EventDistribution data={eventsDistribuitionFormatted} />
          </div>
        </div>
      </div>

      {/* Segunda linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-bold">Eventos futuros</h2>
          <div className="grid gap-4 mt-4 h-80 overflow-auto">
            <EventListCard events={eventsFutureFormatted} />
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-xl font-bold">Lembretes</h2>
          <div className="grid gap-4 mt-4 h-80 overflow-auto">
            <TodoListWrapper
              tasks={tasks}
              createTask={createTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          </div>
        </div>
      </div>
    </>
  );
}
