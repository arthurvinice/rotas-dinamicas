import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface ItemType {
  id: string;
  name: string;
  data: {
    color: string;
    capacity: string;
    price: string;
    generation: string;
    year: number;
  };
}

const globalData: ItemType = {
  id: '1',
  name: 'Mock 1',
  data: {
    color: 'Cor 1',
    capacity: 'Capacidade 1',
    price: 'R$ 5000,00',
    generation: 'Geração 1',
    year: 2023,
  },
}

export default function TelefoneDetalhe() {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  
  const [data, setData] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
        // Simula uma chamada a uma API
        setData([globalData]);
        setIsLoading(false);
      },
      3000); //simula um atraso de 3 segundos
    },[])
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalhe do telefone: ${globalData.name}`,
    });
  }, [navigation, id]);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">ID: {globalData.id}</Text>
      <Text variant="titleLarge">Nome: {globalData.name}</Text>
      <Text variant="bodyMedium">Cor: {globalData.data.color}</Text>
      <Text variant="bodyMedium">Capacidade: {globalData.data.capacity}</Text>
      <Text variant="bodyMedium">Preço: {globalData.data.price}</Text>
      <Text variant="bodyMedium">Geração: {globalData.data.generation}</Text>
      <Text variant="bodyMedium">Ano: {globalData.data.year}</Text>
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
