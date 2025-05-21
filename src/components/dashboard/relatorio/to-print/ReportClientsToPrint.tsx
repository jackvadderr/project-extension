import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface Client {
  name: string;
  recurrence: number;
  source: string;
  revenue: number;
}

const mockClients: Client[] = [
  { name: 'Empresa XPTO', recurrence: 3, source: 'Indicação', revenue: 27000 },
  { name: 'Carlos Souza', recurrence: 2, source: 'Google', revenue: 10000 },
  { name: 'Ana Lima', recurrence: 1, source: 'Instagram', revenue: 8000 },
  { name: 'Instituto Saber', recurrence: 2, source: 'LinkedIn', revenue: 13000 },
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
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 4,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
  },
  headerCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  dataCell: {
    flex: 1,
    padding: 6,
    fontSize: 9,
    textAlign: 'left',
  },
  rightAlignedCell: {
    textAlign: 'right',
  },
});

// Simple icon replacement
const UsersIcon = () => <Text style={{ fontSize: 10 }}>👥</Text>;

export default function ReportClientsToPrint() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <UsersIcon />
        <Text>Clientes</Text>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Nome</Text>
          <Text style={styles.headerCell}>Recorrência</Text>
          <Text style={styles.headerCell}>Origem</Text>
          <Text style={[styles.headerCell, styles.rightAlignedCell]}>Faturamento (R$)</Text>
        </View>

        {/* Table Rows */}
        {mockClients.map((client, idx) => (
          <View key={idx} style={styles.dataRow}>
            <Text style={styles.dataCell}>{client.name}</Text>
            <Text style={styles.dataCell}>{client.recurrence}</Text>
            <Text style={styles.dataCell}>{client.source}</Text>
            <Text style={[styles.dataCell, styles.rightAlignedCell]}>
              {client.revenue.toLocaleString('pt-BR')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}