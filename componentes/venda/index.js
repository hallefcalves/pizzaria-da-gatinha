import {
     Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";



export default function List_Vendas({venda, removerElemento, editar}) {
    return (
        <View style={styles.x} >

            <Text style={styles.x}> {venda.nome}</Text>

            <View style={styles.dadosListadescricao}>
                <Image source={IconePizza} style={styles.icone} />
                <Text style={styles.x} >{venda.descricao} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(venda.codigo)}>
                    <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(venda.codigo)}>
                    <Entypo name="edit" size={32} color="#d6a6b0" />
                </TouchableOpacity>

            </View>
        </View>
    );

};