import { react } from "react";
import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/pizza-cat-modified.png";
import IconeCarrinho from "../../assets/img/shopping_cart_icon.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import { obtemTodasCategorias } from "../../services/dbcat";
import { obtemProdutosCategoria, obtemUmProduto } from "../../services/dbpro"
import { adicionaCarrinho } from "../../services/dbcar";

export default function Tela1({ navigation }) {
  
  var cat = []
  var pro = []
  const [codigo, setCodigo] = useState(undefined)
  const [price, setPrice] = useState("");
  const [codigoPro, setCodigoPro] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [catOpen, catSetOpen] = useState(false);
  const [catValue, catSetValue] = useState(null);
  const [catItems, catSetItems] = useState(cat);
  const [proOpen, proSetOpen] = useState(false);
  const [proValue, proSetValue] = useState(null);
  const [proItems, proSetItems] = useState(pro);
  const [totalPrice, setTotalPrice] = useState("");
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function processamentoUseEffect() {
    
    let obj = await obtemTodasCategorias();
    for(i=0;i<obj.length;i++){
        cat.push({
            label: obj[i].descricao,
            value: obj[i].codigo
        });
    }
    
    catSetItems(cat)
  }
  
  useEffect(() => {
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  async function getPizza(codigo){
    let obj = await obtemProdutosCategoria(codigo);
    for(i=0;i<obj.length;i++){
        pro.push({
            label: obj[i].descricao,
            value: obj[i].codigo
        });
    }
    
    proSetItems(pro)
  } 

  async function getPrice(codigoPro){
    let obj = await obtemUmProduto(codigoPro.value);
    setPrice("R$ " + obj[0].preco + ",00")
    setCodigoPro(codigoPro.value)
  }

  async function salvaDados() {
    let novoRegistro = codigo == undefined;

    let obj = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      codigoPro: codigoPro,
      quantidade: quantidade
    };

    try {
      if (novoRegistro) {
        let resposta = await adicionaCarrinho(obj);

        if (resposta) 
            Alert.alert("Alerta","adicionado com sucesso!",["Ok", "Cancel"]);
        else 
            Alert.alert("Alerta","Falhou miseravelmente!",["Ok", "Cancel"]); 
      } else {
        let resposta = await alteraCarrinho(obj);
        if (resposta) 
            Alert.alert("Alerta","Alterado com sucesso!",["Ok", "Cancel"]);
        else 
            Alert.alert("Alerta","Falhou miseravelmente!",["Ok", "Cancel"]);
      }

      Keyboard.dismiss();
    } catch (e) {
      Alert.alert(e.toString());
    }
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
          onPress={() => navigation.navigate("carrinho")}
        />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.areaBotoes}>
          <Text style={styles.title}>Comprar Pizza</Text>

          <Image style={styles.imagem} source={IconeGatinho} />

          <Text style={styles.label}>Categoria de Pizza</Text>
          <DropDownPicker
            style={styles.caixadropdown}
            listMode="SCROLLVIEW"
            open={catOpen}
            value={catValue}
            items={catItems}
            onChangeValue={(texto)=> getPizza(texto)}
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
            onSelectItem={(texto) => getPrice(texto)}
          />
          <Text style={styles.label}>Preço: {price}</Text>

          <Text style={styles.label}>Quantidade</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(texto) => setQuantidade(texto.toString())}
            value={quantidade.toString()}
            style={styles.caixaTexto}
          />

          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => salvaDados()}
          >
            <Text style={styles.labelBnt}>Adicionar no carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
