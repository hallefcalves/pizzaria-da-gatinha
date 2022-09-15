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
import IconeGatinho from '../../assets/img/chef-cat-modified.png';
import { ScrollView } from 'react-native-gesture-handler';



export default function Tela1({ navigation }) {
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

       <TouchableOpacity
            style={styles.botaoPequeno}
            onPress={() => navigation.navigate("menu")}
          >
            <Text style={styles.labelBnt}>Voltar</Text>
          </TouchableOpacity>

      <ScrollView contentContainerStyle = {{flexGrow:1}}>


          <View style={styles.areaBotoes}>
          <Text style={styles.title}>Nova Pizza</Text>

            <Image
              style={styles.imagem}
              source={IconeGatinho} />
              
            <Text style={styles.label}>Descrição </Text>
            <TextInput
              onChangeText={(texto) => setDescricao(texto)}
              value={descricao.toString()}
              style={styles.caixaTexto} />
            <Text style={styles.label}>Preço unitário</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(texto) => setPreco(texto)}
              value={preco.toString()}
              style={styles.caixaTexto} />
            <Text style={styles.label}>Categoria</Text>
            <DropDownPicker
              style={styles.caixadropdown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems} />

        <TouchableOpacity
              style={styles.botaoGrande}
              onPress={() => navigation.navigate("menu")}
            >
              <Text style={styles.labelBnt}>Salvar</Text>
            </TouchableOpacity>

            

          </View>
          </ScrollView>
      </View>    

  );
}
