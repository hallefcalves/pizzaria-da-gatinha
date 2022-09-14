import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Tela1({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Tela 1</Text>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('menu')}>
                <Text>Voltar</Text>
            </TouchableOpacity>

            <Text>Pizzaria da Gatinha</Text>
            <Text>Tem a massa mais quetinha</Text>
        
            <TouchableOpacity 
            onPress={() => navigation.navigate('crud_produtos')}
            > 
                <Text>Nova Pizza</Text>
            </TouchableOpacity>
        
            <TouchableOpacity 
            onPress={() => navigation.navigate('vender')}
            > 
            <Text>Comprar Pizza</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            onPress={() => navigation.navigate('list_vendas')}
            > 
            <Text>Vendas</Text>
            </TouchableOpacity>
        
        <TouchableOpacity 
            onPress={() => navigation.navigate('crud_categorias')}
            > 
            <Text>Nova Categoria</Text>
            </TouchableOpacity>

        </View>

    );

}