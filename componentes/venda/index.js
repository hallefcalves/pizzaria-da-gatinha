import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";
import List_Produtos from "../produtos/index";
import List_ProdutosVendas from "../produtos_vendas/index";

export default function List_Vendas({ venda, removerElemento, editar, index }) {
  console.log(venda)
  return (
    <View style={{ alignItems: 'center',justifyContent: 'center'}} >
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>

      <Image source={IconePizza} style={styles.icone} />
      <Text style={styles.label}>{venda.date} </Text>
      <Text style={styles.label}>Valor total: R${venda.full} </Text>
      <TouchableOpacity onPress={() => removerElemento(venda.codigo)}>
        <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => editar(venda.codigo)}>
        <Entypo name="edit" size={32} color="#d6a6b0" />
      </TouchableOpacity>

      </View>
      </View>
  );
}
