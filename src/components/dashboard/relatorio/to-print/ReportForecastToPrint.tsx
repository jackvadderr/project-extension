import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface ForecastEvent {
  date: string;
  name: string;
  type: string;
  expectedOccupancy: number;
}

const mockForecast: ForecastEvent[] = [
  { date: '2025-06-05', name: 'Evento XPTO', type: 'Corporativo', expectedOccupancy: 80 },
  { date: '2025-06-10', name: 'Festa Julina', type: 'Aniversário', expectedOccupancy: 60 },
  { date: '2025-06-15', name: 'Congresso 2025', type: 'Workshop', expectedOccupancy: 90 },
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
  eventList: {
    marginBottom: 15,
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
    marginBottom: 5,
  },
  chartTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 8,
  },
  chartItem: {
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 3,
  },
  barContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    backgroundColor: '#0d9488', // teal-600
    borderRadius: 2,
  },
});

// Simple icon replacement
const CalendarIcon = () => <Text style={{ fontSize: 10 }}>📅</Text>;

export default function ReportForecastToPrint() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CalendarIcon />
        <Text>Próximos Eventos e Ocupação Prevista</Text>
      </View>

      <View style={styles.eventList}>
        {mockForecast.map((event, idx) => (
          <View key={idx} style={styles.eventItem}>
            <Text>
              {new Date(event.date).toLocaleDateString('pt-BR')} — {event.name} ({event.type})
            </Text>
            <Text>{event.expectedOccupancy}%</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={styles.chartTitle}>Gráfico de Ocupação Futura</Text>
        {mockForecast.map((event, idx) => (
          <View key={idx} style={styles.chartItem}>
            <Text style={styles.chartLabel}>{event.name}</Text>
            <View style={styles.barContainer}>
              <View style={[styles.barFill, { width: `${event.expectedOccupancy}%` }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}