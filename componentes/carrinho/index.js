import { Text, TouchableOpacity, View, Image } from "react-native";

import styles from "./styles";
import { Ionicons, Entypo } from "@expo/vector-icons";
import IconeMoney from "../../assets/img/money.png";
import IconePizza from "../../assets/img/pizzaIcon.png";

export default function List_Carrinho({ carrinho, removerElemento, editar }) {
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Image source={IconePizza} style={styles.icone} />
        <Text style={styles.label}>{carrinho.descricao} </Text>

        <TouchableOpacity onPress={() => removerElemento(carrinho.codigo)}>
          <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => editar(carrinho.codigo)}>
          <Entypo name="edit" size={32} color="#d6a6b0" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text style={styles.label}>R$: {carrinho.preco},00 </Text>
        <Text style={styles.label}>{carrinho.quantidade} pizza(s)</Text>
      </View>
    </View>
  );
}
