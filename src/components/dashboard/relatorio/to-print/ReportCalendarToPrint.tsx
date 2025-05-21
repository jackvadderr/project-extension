import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface CalendarDay {
  date: string; // formato '2025-05-01'
  status: 'livre' | 'agendado' | 'reservado' | 'bloqueado';
}

const mockCalendarData: CalendarDay[] = [
  { date: '2025-05-01', status: 'reservado' },
  { date: '2025-05-03', status: 'bloqueado' },
  { date: '2025-05-05', status: 'agendado' },
  { date: '2025-05-10', status: 'reservado' },
  { date: '2025-05-15', status: 'bloqueado' },
  { date: '2025-05-20', status: 'agendado' },
];

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

// Simple icon replacement
const CalendarIcon = () => <Text style={{ fontSize: 10 }}>📅</Text>;

function formatDay(dateStr: string) {
  return new Date(dateStr).getDate();
}

export default function ReportCalendarToPrint() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CalendarIcon />
        <Text>Calendário de Eventos</Text>
      </View>

      <View style={styles.calendarGrid}>
        {[...Array(31)].map((_, i) => {
          const date = `2025-05-${String(i + 1).padStart(2, '0')}`;
          const day = mockCalendarData.find(d => d.date === date);
          const status = day ? day.status : 'livre';
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
          <View style={[styles.legendColor, styles.reservado]} />
          <Text>Reservado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.agendado]} />
          <Text>Agendado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.bloqueado]} />
          <Text>Bloqueado</Text>
        </View>
      </View>
    </View>
  );
}