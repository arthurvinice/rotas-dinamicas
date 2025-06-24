import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';
import { ItemType } from '@/types';


export default function TelefoneDetalhe() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  
  const [data, setData] = useState<ItemType | null >(null);
  const [isLoading, setIsLoading] = useState(true);

  //função para chamar a API e obter os dados
  async function buscarDadosEspecificos() {
    setIsLoading(true);
    const resultado = await axios.get('https://api.restful-api.dev/objects/' + id);
    setData(resultado.data);
    setIsLoading(false);
  }

  useEffect(() => {
      buscarDadosEspecificos();
    },[])
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalhe do telefone: ${data?.name || ''}`,
    });
  }, [navigation, id]);

  if (isLoading) {
      return (
        <View style={styles.carregando}>
          <Text variant="bodyLarge">Carregando...</Text>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">ID: {data.id}</Text>
      <Text variant="titleLarge">Nome: {data.name}</Text>
      <Text variant="bodyMedium">Cor: {data.data?.color}</Text>
      <Text variant="bodyMedium">Capacidade: {data.data?.capacity}</Text>
      <Text variant="bodyMedium">Preço: {data.data?.price}</Text>
      <Text variant="bodyMedium">Geração: {data.data?.generation}</Text>
      <Text variant="bodyMedium">Ano: {data.data?.year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
