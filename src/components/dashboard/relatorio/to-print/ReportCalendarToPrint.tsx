import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface CalendarDay {
  date: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 16,
  },
  dayCell: {
    width: '13%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    borderRadius: 2,
  },
  livre: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  agendado: {
    backgroundColor: '#86efac', // green-300
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 16,
    fontSize: 10,
    color: '#4b5563',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate();
}

const getDateStatus = (date: string, events: CalendarDay[]) => {
  console.log(events);
  return events?.some(event => event.date === date) ? 'agendado' : 'livre';
};

export default function ReportCalendarToPrint({ calendar }: { calendar: { date: string, status: string }[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Calendário de Eventos</Text>
      </View>

      <View style={styles.calendarGrid}>
        {[...Array(31)].map((_, i) => {
          const date = `2025-05-${String(i + 1).padStart(2, '0')}`;
          const status = getDateStatus(date, calendar);
          return (
            <View
              key={date}
              style={[styles.dayCell, styles[status]]}
            >
              <Text>{i + 1}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.livre]} />
          <Text>Livre</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.agendado]} />
          <Text>Agendado</Text>
        </View>
      </View>
    </View>
  );
}