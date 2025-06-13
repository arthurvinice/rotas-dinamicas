import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import axios from 'axios';


export default function TelefoneDetalhe() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  
  const [data, setData] = useState<ItemType[]>([]);
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
      title: `Detalhe do telefone: ${data[0]?.name}`,
    });
  }, [navigation, id]);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">ID: {data[0]?.id}</Text>
      <Text variant="titleLarge">Nome: {data[0]?.name}</Text>
      <Text variant="bodyMedium">Cor: {data[0]?.data.color}</Text>
      <Text variant="bodyMedium">Capacidade: {data[0]?.data.capacity}</Text>
      <Text variant="bodyMedium">Preço: {data[0]?.data.price}</Text>
      <Text variant="bodyMedium">Geração: {data[0]?.data.generation}</Text>
      <Text variant="bodyMedium">Ano: {data[0]?.data.year}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
});
