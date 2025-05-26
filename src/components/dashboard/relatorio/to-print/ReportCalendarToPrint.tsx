import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface CalendarDay {
  date: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    marginBottom: 10,
  },
  dayCell: {
    width: '13%', // Approximately 1/7 of the width (7 days in a week)
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 8,
    borderRadius: 2,
  },
  livre: {
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    borderColor: '#d1d5db',
  },
  agendado: {
    backgroundColor: '#fde047', // yellow-300
  },
  reservado: {
    backgroundColor: '#4ade80', // green-400
  },
  bloqueado: {
    backgroundColor: '#f87171', // red-400
  },
  legendContainer: {
    flexDirection: 'row',
    gap: 15,
    fontSize: 8,
    color: '#4b5563',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  legendColor: {
    width: 8,
    height: 8,
    borderRadius: 1,
  },
});

const CalendarIcon = () => <Text style={{ fontSize: 10 }}>📅</Text>;

const getDateStatus = (date: string, events: CalendarDay[]) => {
  return events.some(event => event.date === date) ? 'agendado' : 'livre';
};

export default function ReportCalendarToPrint({ events }: { events: CalendarDay[] }) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CalendarIcon />
        <Text>Calendário de Eventos</Text>
      </View>

      <View style={styles.calendarGrid}>
        {[...Array(31)].map((_, i) => {
          const date = `2025-05-${String(i + 1).padStart(2, '0')}`;
          const status = getDateStatus(date, events);
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
