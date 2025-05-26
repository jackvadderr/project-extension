import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface EventTypeDistribution {
  type: string;
  count: number;
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
  chartItem: {
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    fontSize: 10,
  },
  barContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    backgroundColor: '#6366f1', // indigo-500
    borderRadius: 2,
  },
});

// Simple icon replacement
const PieChartIcon = () => <Text style={{ fontSize: 10 }}>📊</Text>;

export default function ReportEventTypesToPrint({ event = [] }: { event?: EventTypeDistribution[] }) {
  const total = event.reduce((acc, curr) => acc + curr.count, 0);

  // Early return if no events
  if (event.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <PieChartIcon />
          <Text>Distribuição por Tipo de Evento</Text>
        </View>
        <Text style={{ fontSize: 10 }}>Nenhum evento encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <PieChartIcon />
        <Text>Distribuição por Tipo de Evento</Text>
      </View>

      <View>
        {event.map((eventType, idx) => {
          const percentage = (eventType.count / total) * 100;

          return (
            <View key={idx} style={styles.chartItem}>
              <View style={styles.labelRow}>
                <Text>{eventType.type}</Text>
                <Text>{percentage.toFixed(1)}%</Text>
              </View>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}