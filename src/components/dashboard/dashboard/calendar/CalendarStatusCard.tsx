'use client'

import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  getDay, isSameDay, addMonths, subMonths
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface Props {
  scheduledDates: string[];
  blockedDates: string[];
}

export default function SimpleCalendarCard({ scheduledDates, blockedDates }: Props) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const router = useRouter();

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const getStatus = (day: Date) => {
    const iso = format(day, 'yyyy-MM-dd');
    if (blockedDates.includes(iso)) return 'blocked';
    if (scheduledDates.includes(iso)) return 'scheduled';
    return 'free';
  };

  const handleDayClick = () => {
    redirect("/dashboard/events");
  };

  // Cálculo de porcentagem de dias agendados
  const totalDays = days.length;
  const scheduledCount = days.filter(day =>
    scheduledDates.includes(format(day, 'yyyy-MM-dd'))
  ).length;
  const scheduledPercentage = Math.round((scheduledCount / totalDays) * 100);

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full max-w-md">
      {/* Topo do card */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="text-gray-500 hover:text-gray-700">&lt;</button>
        <div className="flex flex-col items-center text-center flex-1">
          <h2 className="text-base font-semibold leading-5">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
          <span className="text-xs text-gray-500">
            {scheduledPercentage}% do mês agendado
          </span>
        </div>
        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-gray-500 hover:text-gray-700">&gt;</button>
      </div>

      {/* Dias da semana */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {weekDays.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Dias do mês */}
      <div className="grid grid-cols-7 text-center text-sm">
        {Array.from({ length: getDay(start) }).map((_, i) => (
          <div key={'empty-' + i} />
        ))}
        {days.map(day => {
          const status = getStatus(day);
          const baseClasses = 'w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs';
          let bgClass = '';

          if (status === 'blocked') bgClass = 'bg-red-300 text-white';
          else if (status === 'scheduled') bgClass = 'bg-blue-400 text-white';
          else bgClass = 'bg-gray-100 text-gray-800';

          return (
            <div key={day.toISOString()} className="p-1">
              <button
                onClick={() => handleDayClick()}
                disabled={status === 'blocked'}
                className={`${baseClasses} ${bgClass} ${
                  status !== 'blocked' ? 'hover:opacity-80 cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-3 flex justify-around text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-gray-200 rounded-full inline-block" />
          Livre
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-400 rounded-full inline-block" />
          Agendado
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-300 rounded-full inline-block" />
          Bloqueado
        </div>
      </div>
    </div>
  );
}
