import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import ReportSummaryToPrint from '@/components/dashboard/relatorio/to-print/ReportSummaryToPrint';
import ReportKPIsToPrint from '@/components/dashboard/relatorio/to-print/ReportKPIToPrint';
import ReportFinancialsToPrint from '@/components/dashboard/relatorio/to-print/ReportFinancialsToPrint';
import ReportCalendarToPrint from '@/components/dashboard/relatorio/to-print/ReportCalendarToPrint';
import ReportEventsTableToPrint from '@/components/dashboard/relatorio/to-print/ReportEventTableToPrint';
import ReportClientsToPrint from '@/components/dashboard/relatorio/to-print/ReportClientsToPrint';
import ReportForecastToPrint from '@/components/dashboard/relatorio/to-print/ReportForecastToPrint';
import ReportNotesFromAdmToPrint from '@/components/dashboard/relatorio/to-print/ReportNotesFromAdmToPrint';
import ReportFooterToPrint from '@/components/dashboard/relatorio/to-print/ReportFooterToPrint';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  summaryBox: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  kpiGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  kpiBox: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    flex: 1,
    flexDirection: 'row',
  },
  table: {
    width: '100%',
    border: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  financialBox: {
    padding: 10,
    backgroundColor: '#f3f4f6',
    marginBottom: 10,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  calendarDay: {
    width: '13%',
    padding: 5,
    backgroundColor: '#f3f4f6',
    textAlign: 'center',
  },
});


export function ReportPDF({ data }: {
  data: {
    adminName: string
    period: string
    summary: {
      totalEvents: number
      revenue: number
      occupancyRate: number
    }
    kpis: Array<{
      label: string
      value: number
      status: string
    }>
    financials: {
      totalRevenue: number
      averageTicket: number
      topClients: Array<{
        name: string
        value: number
      }>
    }
    calendar: Array<{
      date: string
      status: string
    }>
    events: Array<{
      date: string
      type: any
      client: string
      value: any
    }>
    clients: Array<{
      name: string
      recurrence: number
      source: string
      revenue: number
    }>
    forecast: {
      upcomingEvents: any[]
      occupancyGraph: number[]
      eventTypeStats: Record<string, number>
    }
    notes: string
  }
}) {
  return (
    <>
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Relatório de Eventos</Text>
            <Text>Administrador: {data.adminName}</Text>
            <Text>Período: {data.period}</Text>
          </View>
        </View>
        <View>
          <ReportSummaryToPrint summary={data.summary}/>
        </View>
        <View>
          <ReportKPIsToPrint kpis={data.kpis} />
        </View>
        <View>
          <ReportFinancialsToPrint financials={data.financials} />
        </View>
        <View>
          <ReportCalendarToPrint calendar={data.calendar} />
        </View>
        <View>
          <ReportEventsTableToPrint events={data.events} />
        </View>
        <View>
          <ReportClientsToPrint clients={data.clients} />
        </View>
        <View>
          <ReportForecastToPrint forecast={data.forecast} />
        </View>
        <View>
          <ReportNotesFromAdmToPrint notes={data.notes} />
        </View>
        <View>
          <ReportFooterToPrint />
        </View>
      </Page>
    </Document>
    </>
  );
}