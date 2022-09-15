import { react } from "react";
import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

export default function Tela1({ navigation }) {
  const [codigo, setCodigo] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Pizza Salgada", value: "Pizza Salgada" },
    { label: "Pizza Doce", value: "Pizza Doce" },
  ]);

  return (
    <View style={styles.container}>
        
      <Text style={styles.label}>Voltar</Text>
      <TouchableOpacity
        style={styles.botaoPequeno}
        onPress={() => navigation.navigate("menu")}
      >
        <Text>Voltar</Text>
      </TouchableOpacity>

      <Text>Código</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(texto) => setCodigo(texto)}
        value={codigo.toString()}
        //style={styles.caixaSenha}
      />
      <Text>Descrição </Text>
      <TextInput
        onChangeText={(texto) => setDescricao(texto)}
        value={descricao.toString()}
        //style={styles.caixaSenha}
      />
      <Text>Preço unitário</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(texto) => setPreco(texto)}
        value={preco.toString()}
        //style={styles.caixaSenha}
      />
      <Text>Categoria</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
    </View>
  );
}
