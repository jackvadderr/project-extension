import { View, Text, StyleSheet } from '@react-pdf/renderer';


interface Summary {
  totalEvents: number;
  revenue: number;
  occupancyRate: number;
}

interface ReportSummaryProps {
  summary: Summary;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'semibold',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  card: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default function ReportSummaryToPrint({ summary }: ReportSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sumário Executivo</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          {/*<CalendarIcon />*/}
          <Text style={styles.label}>Eventos Realizados</Text>
          <Text style={styles.value}>{summary.totalEvents}</Text>
        </View>
        <View style={styles.card}>
          {/*<DollarIcon />*/}
          <Text style={styles.label}>Receita Total</Text>
          <Text style={styles.value}>R$ {summary.revenue.toLocaleString('pt-BR')}</Text>
        </View>
        <View style={styles.card}>
          {/*<ChartIcon />*/}
          <Text style={styles.label}>Taxa de Ocupação</Text>
          <Text style={styles.value}>{(summary.occupancyRate * 100).toFixed(0)}%</Text>
        </View>
      </View>
    </View>
  );
}
