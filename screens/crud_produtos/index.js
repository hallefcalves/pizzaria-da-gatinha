import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Tela1({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Tela 1</Text>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('Home')}>
                <Text>Voltar</Text>
            </TouchableOpacity>

        </View>

    );

}