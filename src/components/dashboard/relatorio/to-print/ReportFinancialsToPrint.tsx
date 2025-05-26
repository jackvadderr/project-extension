import { View, Text, StyleSheet } from '@react-pdf/renderer';

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
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  card: {
    width: '48%',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
  },
  cardHeader: {
    fontSize: 12,
    color: '#4b5563',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'medium',
    marginBottom: 8,
  },
  clientList: {
    marginBottom: 16,
  },
  clientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 4,
  },
  barContainer: {
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#4b5563',
    marginBottom: 4,
  },
  barBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
  },
  barFill: {
    height: 8,
    backgroundColor: '#2563eb', // blue-600
    borderRadius: 4,
  },
});

export default function ReportFinancialsToPrint({ financials }: { financials?:
{
    totalRevenue: number
    averageTicket: number
    topClients: {
      name: string
      value: number
    }[]
}
}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Financeiro</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text>Receita Total</Text>
          </View>
          <Text style={styles.cardValue}>R$ {financials?.totalRevenue.toLocaleString('pt-BR')}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text>Ticket Médio</Text>
          </View>
          <Text style={styles.cardValue}>R$ {financials?.averageTicket.toLocaleString('pt-BR')}</Text>
        </View>
      </View>

      <View style={styles.clientList}>
        <Text style={styles.sectionTitle}>Top Clientes</Text>
        {financials?.topClients.map((client, idx) => (
          <View key={idx} style={styles.clientItem}>
            <Text>{client.name}</Text>
            <Text>R$ {client.value.toLocaleString('pt-BR')}</Text>
          </View>
        ))}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Distribuição Visual</Text>
        <View style={{ gap: 8 }}>
          {financials?.topClients.map((client, idx) => {
            const total = financials.totalRevenue;
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
    </View>
  );
}