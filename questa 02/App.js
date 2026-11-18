import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert,
  Platform 
} from 'react-native';

export default function App() {
  const [nome, setNome] = useState('');
  const [nota1, setNota1] = useState('');
  const [nota2, setNota2] = useState('');
  const [nota3, setNota3] = useState('');
  
  const [resultado, setResultado] = useState(null);

  const calcularMedia = () => {
    if (!nome || !nota1 || !nota2 || !nota3) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const n1 = parseFloat(nota1.replace(',', '.'));
    const n2 = parseFloat(nota2.replace(',', '.'));
    const n3 = parseFloat(nota3.replace(',', '.'));

    if (isNaN(n1) || n1 < 0 || n1 > 10 ||
        isNaN(n2) || n2 < 0 || n2 > 10 ||
        isNaN(n3) || n3 < 0 || n3 > 10) {
      Alert.alert('Nota inválida', 'Todas as notas devem ser valores numéricos entre 0,0 e 10,0.');
      return;
    }

    const media = (n1 + n2 + n3) / 3;
    const situacao = media >= 7.0 ? 'Aprovado' : 'Reprovado';

    setResultado({
      nomeAluno: nome,
      mediaFinal: media.toFixed(1),
      situacaoAluno: situacao
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Controle Acadêmico</Text>
      <Text style={styles.subtitulo}>Cálculo de Média de Estudantes</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome do Estudante:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: João Silva"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Nota 1 (0 a 10):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 8.0"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={nota1}
          onChangeText={setNota1}
        />

        <Text style={styles.label}>Nota 2 (0 a 10):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 7.0"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={nota2}
          onChangeText={setNota2}
        />

        <Text style={styles.label}>Nota 3 (0 a 10):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 9.0"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={nota3}
          onChangeText={setNota3}
        />

        <TouchableOpacity style={styles.botao} onPress={calcularMedia}>
          <Text style={styles.textoBotao}>Calcular média</Text>
        </TouchableOpacity>
      </View>

      {resultado && (
        <View style={styles.cardResultado}>
          <Text style={styles.resultadoTitulo}>Resultado do Aluno</Text>
          <Text style={styles.resultadoTexto}>Estudante: <Text style={styles.negrito}>{resultado.nomeAluno}</Text></Text>
          <Text style={styles.resultadoTexto}>Média: <Text style={styles.negrito}>{resultado.mediaFinal}</Text></Text>
          <Text style={styles.resultadoTexto}>
            Situação:{' '}
            <Text style={[styles.negrito, resultado.situacaoAluno === 'Aprovado' ? styles.aprovado : styles.reprovado]}>
              {resultado.situacaoAluno}
            </Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 25,
  },
  formGroup: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 15,
    color: '#333',
  },
  botao: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardResultado: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  resultadoTexto: {
    fontSize: 16,
    color: '#444',
    marginBottom: 6,
  },
  negrito: {
    fontWeight: 'bold',
  },
  aprovado: {
    color: '#28a745',
  },
  reprovado: {
    color: '#dc3545',
  },
});