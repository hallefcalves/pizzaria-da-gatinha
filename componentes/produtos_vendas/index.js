import {
    Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";



export default function List_ProdutosVendas({venda}) {
   return (
    <View style={{ alignItems: 'center',justifyContent: 'center', marginBottom: 30}} >
            <View style={{flexDirection: 'row', }}>
            <Text style={styles.label} > Nome: {venda.descricao} </Text>
            </View>
            <View style={{flexDirection: 'row', }}>
            <Text style={styles.label} >Preço Unitário: R${venda.unit}</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
            <Text style={styles.label} >Quantidade: {venda.quantidade} unidades</Text>
            </View>
            </View>
   );
};