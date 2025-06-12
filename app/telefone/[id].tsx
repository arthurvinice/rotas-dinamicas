import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';


const globalData = {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalhe do telefone: ${globalData.name}`,
    });
  }, [navigation, id]);

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">ID: {id}</Text>
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
