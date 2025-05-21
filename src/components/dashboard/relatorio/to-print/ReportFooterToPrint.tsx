import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    fontSize: 9,
    color: '#6b7280', // gray-500
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb', // gray-200
    paddingTop: 10,
  },
});

export default function ReportFooterToPrint() {
  const generatedAt = new Date().toLocaleDateString('pt-BR');

  return (
    <View style={styles.footer}>
      <Text>Sistema de Gestão de Eventos — Relatório gerado em {generatedAt}</Text>
    </View>
  );
}