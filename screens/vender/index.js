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
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/pizza-cat-modified.png";
import IconeCarrinho from "../../assets/img/shopping_cart_icon.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import { obtemTodasCategorias } from "../../services/dbcat";

export default function Tela1({ navigation }) {
  
  var cat = []
  var pro = []
  const [preco, setPreco] = useState("");
  const [catOpen, catSetOpen] = useState(false);
  const [catValue, catSetValue] = useState(null);
  const [catItems, catSetItems] = useState(cat);
  const [proOpen, proSetOpen] = useState(false);
  const [proValue, proSetValue] = useState(null);
  const [proItems, proSetItems] = useState(pro);
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function processamentoUseEffect() {
    
    let obj = await obtemTodasCategorias();
    console.log(obj)
    for(i=0;i<obj.length;i++){
        cat.push({
            label: obj[i].categoria,
            value: obj[i].codigo
        });
    }
    
    console.log("UseEffect...");
    catSetItems(cat)
  }
  
  useEffect(() => {
    console.log("executando useffect");
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  function limparCampos() {
    setDescricao("");
    setPreco("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.botaoPequeno}
          onPress={() => navigation.navigate("menu")}
        >
          <Text style={styles.labelBnt}>Voltar</Text>
        </TouchableOpacity>

        <IconButton
          icon="cart-outline"
          color="#d6a6b0"
          size={55}
          onPress={() => navigation.navigate("menu")}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.areaBotoes}>
          <Text style={styles.title}>Comprar Pizza</Text>

          <Image style={styles.imagem} source={IconeGatinho} />

          <Text style={styles.label}>Tipo de Pizza</Text>
          <DropDownPicker
            style={styles.caixadropdown}
            listMode="SCROLLVIEW"
            open={catOpen}
            value={catValue}
            items={catItems}
            setOpen={catSetOpen}
            setValue={catSetValue}
            setItems={catSetItems}
          />

          <Text style={styles.label}>Pizza</Text>
          <DropDownPicker
            style={styles.caixadropdown}
            listMode="SCROLLVIEW"
            open={proOpen}
            value={proValue}
            items={proItems}
            setOpen={proSetOpen}
            setValue={proSetValue}
            setItems={proSetItems}
          />

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(texto) => setPreco(texto)}
            value={preco.toString()}
            style={styles.caixaTexto}
          />

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
