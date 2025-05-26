import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface ForecastEvent {
  date: string;
  name: string;
  type: string;
  expectedOccupancy: number;
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

export default function ReportForecastToPrint({forecast}: {forecast:
{
  upcomingEvents: any[]
  occupancyGraph: number[]
  eventTypeStats: Record<string, number>
}
}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Próximos Eventos e Ocupação Prevista</Text>
      </View>

      <View>
        <View style={styles.eventList}>
          {forecast.upcomingEvents.map((event, idx) => (
            <View key={idx} style={styles.eventItem}>
              <Text>
                {new Date(event.date).toLocaleDateString('pt-BR')} — {event.client} ({event.type})
              </Text>
              <Text>{Math.round(forecast.occupancyGraph[idx] * 100)}%</Text>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.chartTitle}>Gráfico de Ocupação Futura</Text>
          {forecast.upcomingEvents.map((event, idx) => (
            <View key={idx} style={styles.chartItem}>
              <Text style={styles.chartLabel}>{event.client}</Text>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${Math.round(forecast.occupancyGraph[idx] * 100)}%` }
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}