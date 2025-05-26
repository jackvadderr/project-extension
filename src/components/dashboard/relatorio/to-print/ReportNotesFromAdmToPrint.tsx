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
  notesContainer: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 4,
    fontSize: 10,
    lineHeight: 1.5,
  },
});

const NoteIcon = () => <Text style={{ fontSize: 10 }}>📝</Text>;

export default function ReportNotesFromAdmToPrint({notes}: {notes?: string}) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <NoteIcon />
        <Text>Observações do Administrador</Text>
      </View>

      <View style={styles.notesContainer}>
        <Text>{notes}</Text>
      </View>
    </View>
  );
}