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
import IconeGatinho from '../../assets/img/pizza-cat-modified.png';
import IconeCarrinho from '../../assets/img/shopping_cart_icon.png';
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

        <View  style={{flexDirection: 'row',justifyContent: 'space-between',}}>

        <TouchableOpacity
            style={styles.botaoPequeno}
            onPress={() => navigation.navigate("menu")}
          >
            <Text style={styles.labelBnt}>Voltar</Text>
          </TouchableOpacity>

          <Image
              style={styles.imageicon}
              onPress={() => navigation.navigate("menu")}
              source={IconeCarrinho} />

        </View>

        <ScrollView contentContainerStyle = {{flexGrow:1}}>

         

          <View style={styles.areaBotoes}>
          <Text style={styles.title}>Comprar Pizza</Text>

            <Image
              style={styles.imagem}
              source={IconeGatinho} />
              
              <Text style={styles.label}>Pizza</Text>
            <DropDownPicker
              style={styles.caixadropdown}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems} />

            <Text style={styles.label}>Quantidade</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={(texto) => setPreco(texto)}
              value={preco.toString()}
              style={styles.caixaTexto} />



        <TouchableOpacity
              style={styles.botaoGrande}
              onPress={() => navigation.navigate("menu")}
            >
              <Text style={styles.labelBnt}>Adicionar no carrinho</Text>
            </TouchableOpacity>

            

          </View>
          </ScrollView>

      </View>    

  );
}
