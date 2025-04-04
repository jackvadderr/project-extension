'use client'

import TodoList from '@/components/dashboard/dashboard/TodoList'
import EventListCard from '@/components/dashboard/dashboard/cards/events/future/EventCard'
import MiniEventCardPage from '@/components/dashboard/dashboard/MiniEventCardPage'
import EventsByMonthChart from '@/components/dashboard/dashboard/charts/LineChart'
import EventDistribution from '@/components/dashboard/dashboard/charts/PieChart'
import { EventCardProps } from '@/types/EventCardProps'
import TodoListWrapper from '@/components/dashboard/dashboard/TodoListClient';

interface Props {
  onGoingEvents: any;
  eventsByMonthFormatted: any;
  eventsDistribuitionFormatted: any;
  eventsFutureFormatted: EventCardProps[];
}

export default function DashboardClient({
                                          onGoingEvents,
                                          eventsByMonthFormatted,
                                          eventsDistribuitionFormatted,
                                          eventsFutureFormatted
                                        }: Props) {
  return (
    <>
      {/* Primeira linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Eventos em andamento</h2>
          <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
            <MiniEventCardPage events={onGoingEvents} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Quantidade de eventos por mês</h2>
          <div className="h-60 overflow-hidden">
            <EventsByMonthChart data={eventsByMonthFormatted} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Distribuição de eventos</h2>
          <div className="h-60 overflow-hidden">
            <EventDistribution data={eventsDistribuitionFormatted} />
          </div>
        </div>
      </div>

      {/* Segunda linha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Eventos futuros</h2>
          <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
            <EventListCard events={eventsFutureFormatted} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Lembretes</h2>
          <div className="grid gap-4 mt-4 max-h-60 overflow-auto">
            {/*<TodoList />*/}
            <TodoListWrapper />
          </div>
        </div>
      </div>
    </>
  );
}
