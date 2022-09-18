import {
    Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";



export default function List_ProdutosVendas({venda}) {
   return (
    <View style={{ alignItems: 'center',justifyContent: 'center'}} >
            <View style={{flexDirection: 'row', }}>
            <Image source={IconePizza} style={styles.icone} />
            <Text style={styles.label} > Nome: {venda.descricao} </Text>
            </View>
            <View style={{flexDirection: 'row', }}>
            <Text style={styles.label} >Preço: R${venda.unit},00</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
            <Text style={styles.label} >Quantidade: {venda.quantidade} unidades</Text>
            </View>
            </View>
   );
};