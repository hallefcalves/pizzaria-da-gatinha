import {
     Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";



export default function List_Vendas({venda, removerElemento, editar}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-around',}} >

            <Text style={styles.label}> {venda.nome}</Text>

                <Image source={IconePizza} style={styles.icone} />
                <Text style={styles.label} >{venda.codigo} </Text>
                <Text style={styles.label} >{venda.data} </Text>
                <Text style={styles.label} >{venda.preco} </Text>

                <TouchableOpacity onPress={() => removerElemento(venda.codigo)}>
                    <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(venda.codigo)}>
                    <Entypo name="edit" size={32} color="#d6a6b0" />
                </TouchableOpacity>

        </View>
    );

};