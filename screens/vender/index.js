import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Tela0({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Tela 0</Text>

            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('menu')}>
                <Text>Voltar</Text>
            </TouchableOpacity>
              

        </View>

    );

}