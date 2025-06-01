"use server"

import { Prisma } from '@prisma/client'
import { findCustomerById } from '@/actions/clients/find-customer-by-id-action'
import { getEvents } from '@/actions/event/list-all-events-action'
import { getScheduledDatesAction } from '@/actions/event/get-scheduled-dates-action'
import { getEventosByFilter } from '@/actions/event/find-events-with-filters-action'
import { getCountEventsByMonthAction } from '../event/events-by-month-action'
import { getCountEventsDistribuition } from '../event/events-distribuition-action'

type Period = {
  startYear: number
  endYear: number
  startMonth: number
  endMonth: number
}

type FinancialMetrics = {
  totalEvents: number
  revenue: number
  averageTicket: number
}

type ClientEventData = {
  customer?: { name: string }
  events: any[]
  revenue: number
}

const createDateFilter = (period: Period): Prisma.EventWhereInput['event_date'] => ({
  gte: new Date(period.startYear, period.startMonth - 1, 1),
  lte: new Date(period.endYear, period.endMonth, 0, 23, 59, 59)
})

const isWithinPeriod = (date: Date, period: Period): boolean => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return (
    (year > period.startYear ||
      (year === period.startYear && month >= period.startMonth)) &&
    (year < period.endYear ||
      (year === period.endYear && month <= period.endMonth))
  )
}

const getDaysInPeriod = (period: Period): number => {
  const start = new Date(period.startYear, period.startMonth - 1, 1)
  const end = new Date(period.endYear, period.endMonth, 0)
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
}

const getScheduledDatesInPeriod = (scheduledDates: string[], period: Period): number => {
  return scheduledDates.filter(date =>
    isWithinPeriod(new Date(date), period)
  ).length
}

const processClientEventData = async (clientId: string, period: Period): Promise<ClientEventData> => {
  const filters: Prisma.EventWhereInput = {
    AND: [{ clientId }, { event_date: createDateFilter(period) }]
  }

  const events = await getEventosByFilter(filters, 1, 100, { event_date: 'asc' })
  const customer = await findCustomerById(clientId)
  const revenue = events.reduce((sum, ev) => sum + Number(ev.rent || 0), 0)

  return { customer, events, revenue }
}

const calculateFinancialMetrics = (eventsByClients: any[]): FinancialMetrics => {
  const totalEvents = eventsByClients.length
  const revenue = eventsByClients.reduce((sum, event) => sum + Number(event.revenue || 0), 0)
  const averageTicket = totalEvents > 0 ? revenue / totalEvents : 0

  return { totalEvents, revenue, averageTicket }
}

function getMonthName(monthNumber: number): string {
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return months[monthNumber - 1] || "Mês inválido";
}


const getUpcomingEvents = async (allEvents: any[]): Promise<any[]> => {
  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0)

  const filteredEvents = allEvents
    .filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= nextMonth &&
        eventDate <= nextMonthEnd &&
        event.status === 'scheduled'
    })
    .slice(0, 5)

  return Promise.all(
    filteredEvents.map(async event => {
      const customer = await findCustomerById(event.client_id)
      return {
        date: new Date(event.date).toISOString().split('T')[0],
        client: customer?.name ?? 'Desconhecido',
        type: event.event_type
      }
    })
  )
}

const calculateOccupancy = (scheduledDates: string[]): number[] => {
  const today = new Date()
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const nextMonthEnd = new Date(today.getFullYear(), today.getMonth() + 2, 0)
  const daysInNextMonth = nextMonthEnd.getDate()

  const occupancyByDay = new Array(daysInNextMonth).fill(0)

  scheduledDates.forEach(date => {
    const dateObj = new Date(date)
    if (dateObj >= nextMonth && dateObj <= nextMonthEnd) {
      const day = dateObj.getDate() - 1
      occupancyByDay[day] = 1
    }
  })

  return occupancyByDay.map((_, index) => {
    const window = occupancyByDay.slice(Math.max(0, index - 2), index + 3)
    return window.reduce((sum, val) => sum + val, 0) / window.length
  })
}

export async function getReportDataAction(adminName: string, period: Period) {
  const [eventsByMonth, scheduledDates, eventsDistribution, allEvents] = await Promise.all([
    getCountEventsByMonthAction(
      period.startYear,
      period.endYear,
      period.startMonth,
      period.endMonth
    ),
    getScheduledDatesAction(),
    getCountEventsDistribuition(),
    getEvents()
  ])

  const filteredEvents = allEvents.filter(event =>
    isWithinPeriod(new Date(event.date), period)
  )

  const clientIds = Array.from(new Set(filteredEvents.map(e => e.client_id)))
  const clientEventsData = await Promise.all(
    clientIds.map(clientId => processClientEventData(clientId, period))
  )

  const [formattedEvents, upcomingEvents] = await Promise.all([
    Promise.all(
      filteredEvents.map(async event => {
        const customer = await findCustomerById(event.client_id)
        return {
          date: new Date(event.date).toISOString().split('T')[0],
          type: event.event_type,
          client: customer?.name ?? 'Desconhecido',
          value: event.rent
        }
      })
    ),
    getUpcomingEvents(allEvents)
  ])

  const eventsByClients = clientEventsData.map(({ customer, events, revenue }) => ({
    name: customer?.name ?? 'Desconhecido',
    recurrence: events.length,
    source: 'Desconhecido',
    revenue
  }))

  const topClients = clientEventsData.map(({ customer, revenue }) => ({
    name: customer?.name ?? 'Desconhecido',
    value: revenue
  }))

  const { totalEvents, revenue, averageTicket } = calculateFinancialMetrics(eventsByClients)
  const occupancyRate = getScheduledDatesInPeriod(scheduledDates, period) / getDaysInPeriod(period)

  return {
    adminName,
    period: `${getMonthName(period.startMonth)} ${period.startYear} - ${getMonthName(period.endMonth)} ${period.endYear}`,
    summary: {
      totalEvents,
      revenue,
      occupancyRate,
    },
    kpis: [
      { label: 'Eventos Agendados', value: totalEvents, status: 'green' },
      { label: 'Eventos Cancelados', value: allEvents.filter(e => e.status === 'canceled').length, status: 'yellow' },
      { label: 'Taxa de Ocupação', value: Math.round(occupancyRate * 100), status: 'green' },
    ],
    financials: {
      totalRevenue: revenue,
      averageTicket,
      topClients
    },
    calendar: scheduledDates.map(date => ({ date, status: 'reservado' })),
    events: formattedEvents,
    clients: eventsByClients,
    forecast: {
      upcomingEvents,
      occupancyGraph: calculateOccupancy(scheduledDates),
      eventTypeStats: eventsDistribution.reduce((acc, item) => {
        acc[item.event_type] = item.count
        return acc
      }, {} as Record<string, number>)
    },
    notes: '',
  }
}