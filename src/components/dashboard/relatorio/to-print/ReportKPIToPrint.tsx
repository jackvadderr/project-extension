import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface KPI {
  label: string;
  value: number;
  status: 'green' | 'yellow' | 'red';
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
    flexWrap: 'wrap',
    gap: 15,
  },
  card: {
    width: '30%',
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusGreen: {
    backgroundColor: '#10b981', // Tailwind green-500 equivalent
  },
  statusYellow: {
    backgroundColor: '#f59e0b', // Tailwind yellow-500 equivalent
  },
  statusRed: {
    backgroundColor: '#ef4444', // Tailwind red-500 equivalent
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default function ReportKPIsToPrint({ kpis }: {kpis: {
    label: string
    value: number
    status: string
  }[]
}) {
  const statusStyles = {
    green: [styles.statusIndicator, styles.statusGreen],
    yellow: [styles.statusIndicator, styles.statusYellow],
    red: [styles.statusIndicator, styles.statusRed],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KPIs Operacionais</Text>
      <View style={styles.grid}>
        {kpis.map((kpi, index) => (
          <View key={index} style={styles.card}>
            <View style={statusStyles[kpi.status]} />
            <View>
              <Text style={styles.label}>{kpi.label}</Text>
              <Text style={styles.value}>{kpi.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}