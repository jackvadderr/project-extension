import { View, Text, StyleSheet } from '@react-pdf/renderer';

const mockNotes = `Observações gerais:
- Cliente XPTO demonstrou interesse em novos pacotes corporativos.
- Analisar possibilidade de desconto progressivo para clientes recorrentes.
- Investir em divulgação de eventos via redes sociais e parcerias.`;

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
  notesContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 4,
    fontSize: 10,
    lineHeight: 1.5,
  },
});

// Simple icon replacement
const NoteIcon = () => <Text style={{ fontSize: 10 }}>📝</Text>;

export default function ReportNotesFromAdmToPrint() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <NoteIcon />
        <Text>Observações do Administrador</Text>
      </View>

      <View style={styles.notesContainer}>
        <Text>{mockNotes}</Text>
      </View>
    </View>
  );
}