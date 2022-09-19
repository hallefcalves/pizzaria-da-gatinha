import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";
import List_Produtos from "../produtos/index";
import List_ProdutosVendas from "../produtos_vendas/index";

export default function List_Vendas({
  venda,
  compras,
  removerElemento,
}) {
  let code = venda.codigo;
  console.log(venda)
  console.log(compras)
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Image source={IconePizza} style={styles.icone} />
        <Text style={styles.label}>{venda.codigo} </Text>

        <TouchableOpacity onPress={() => removerElemento(venda.codigo)}>
          <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>{venda.date} </Text>
      <Text style={styles.label}>Valor total: R${venda.full} </Text>
      <Text style={styles.label}>Produtos: </Text>
      {compras.map((compra, index) => {
        return compra.codigoVen === code ? (
          <List_ProdutosVendas
            compra={compra}
            index={index}
          ></List_ProdutosVendas>
        ) : (
          <Text></Text>
        );
      })}
    </View>
  );
}
