import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizza.png";

export default function List_Produtos({ produto, removerElemento, editar }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row" }}>
        <Image source={IconePizza} style={styles.icone} />
        <Text style={styles.label}>{produto.categoria} </Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text style={styles.label}>Nome: {produto.descricao} </Text>
        <TouchableOpacity onPress={() => removerElemento(produto.codigo)}>
          <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => editar(produto.codigo)}>
          <Entypo name="edit" size={32} color="#d6a6b0" />
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Valor: R$ {produto.preco},00 </Text>

      <View style={{ flexDirection: "row" }}>
        
      </View>
    </View>
  );
}
