import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface FinancialData {
  totalRevenue: number;
  averageTicket: number;
  topClients: { name: string; value: number }[];
}

const mockFinancialData: FinancialData = {
  totalRevenue: 150000,
  averageTicket: 6000,
  topClients: [
    { name: 'Cliente A', value: 35000 },
    { name: 'Cliente B', value: 27000 },
    { name: 'Cliente C', value: 21000 },
  ],
};

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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 15,
  },
  card: {
    width: '48%',
    padding: 10,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
  cardHeader: {
    fontSize: 10,
    color: '#4b5563',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'medium',
    marginBottom: 5,
  },
  clientList: {
    marginBottom: 10,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 3,
  },
  barContainer: {
    marginBottom: 10,
  },
  barLabel: {
    fontSize: 8,
    color: '#4b5563',
    marginBottom: 2,
  },
  barBackground: {
    width: '100%',
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
  },
  barFill: {
    height: 4,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
});

// Simple icon replacements (React PDF doesn't support SVG icons directly)
const BarChartIcon = () => <Text style={{ fontSize: 10 }}>📊</Text>;
const DollarIcon = () => <Text style={{ fontSize: 10 }}>💰</Text>;
const UserIcon = () => <Text style={{ fontSize: 10 }}>👤</Text>;

export default function ReportFinancialsToPrint() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <BarChartIcon />
        <Text>Financeiro</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <DollarIcon />
            <Text>Receita Total</Text>
          </View>
          <Text style={styles.cardValue}>R$ {mockFinancialData.totalRevenue.toLocaleString('pt-BR')}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <UserIcon />
            <Text>Ticket Médio</Text>
          </View>
          <Text style={styles.cardValue}>R$ {mockFinancialData.averageTicket.toLocaleString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.clientList}>
        <Text style={styles.sectionTitle}>Top Clientes</Text>
        {mockFinancialData.topClients.map((client, idx) => (
          <View key={idx} style={styles.clientItem}>
            <Text>{client.name}</Text>
            <Text>R$ {client.value.toLocaleString('pt-BR')}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Distribuição Visual</Text>
        {mockFinancialData.topClients.map((client, idx) => {
          const total = mockFinancialData.totalRevenue;
          const percentage = (client.value / total) * 100;
          return (
            <View key={idx} style={styles.barContainer}>
              <Text style={styles.barLabel}>{client.name} — {percentage.toFixed(1)}%</Text>
              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${percentage}%` }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}