import { View, Text, StyleSheet } from '@react-pdf/renderer';

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

export default function ReportEventsTableToPrint({events}: {events:
{
  date: string
  type: any
  client: string
  value: any
}[]
}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Tabela de Eventos Realizados</Text>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Cliente</Text>
          <Text style={[styles.headerCell, styles.rightAlignedCell]}>Valor (R$)</Text>
        </View>

        {/* Table Rows */}
        {events.map((event, idx) => (
          <View key={idx} style={styles.dataRow}>
            <Text style={styles.dataCell}>
              {new Date(event.date).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.dataCell}>{event.client}</Text>
            <Text style={[styles.dataCell, styles.rightAlignedCell]}>
              {event.value.toLocaleString('pt-BR')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}