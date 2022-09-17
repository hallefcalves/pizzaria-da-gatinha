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
import IconeGatinho from "../../assets/img/cat-puff-modified.png";
import IconeCarrinho from "../../assets/img/shopping_cart_icon.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import { obtemTodasCategorias } from "../../services/dbcat";
import { obtemProdutosCategoria, obtemUmProduto } from "../../services/dbpro"
import { adicionaCarrinho } from "../../services/dbcar";
import List_Carrinho from '../../componentes/carrinho/index'


export default function Tela1({ navigation }) {
  
  var cat = []
  var pro = []
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
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [preco, setPreco] = useState("");
  const [vendas, setVendas] = useState([]);

  let object = {
    codigo: '01',
    descricao: 'Mussarela',
    data: '02/08/2022',
    preco: 'R$ 35'

  }

  function editar(identificador) {
    const venda = venda.find(venda => venda.codigo == identificador);
    
    if (venda != undefined) {
    setcodigo(venda.codigo);
    setNome(venda.descricao);
    setdescricao(venda.data);
    }
    
    console.log(venda);
    }

    function removerElemento(identificador) {
        Alert.alert('Atenção', 'Confirma a remoção do venda?',
        [
        {
        text: 'Sim',
        onPress: () => efetivaRemovervenda(identificador),
        },
        {
        text: 'Não',
        style: 'cancel',
        }
        ]);
        }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }


  async function getPrice(codigoPro){
    let obj = await obtemUmProduto(codigoPro);
    setPrice("R$ " + obj[0].preco + ",00")
    console.log(price)
    setCodigoPro(codigoPro)
  }

  function getTotalPrice(quantidade){
    let num = parseInt(price.toString())
    console.log(num)
    console.log(quantidade)
    setTotalPrice(num*quantidade)
    console.log(totalPrice)
    setQuantidade(quantidade)
  }

  async function salvaDados() {
    let novoRegistro = codigo == undefined;

    let obj = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      codigoPro: codigoPro,
      quantidade: quantidade
    };

    console.log(obj.codigoPro)

    console.log(obj.codigo);
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
      limparCampos();
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.botaoPequeno}
          onPress={() => navigation.navigate("menu")}
        >
          <Text style={styles.labelBnt}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

      <View style={styles.topPart}>
        <Text style={styles.title}>Meu Carrinho</Text>
        <Image style={styles.imagem} source={IconeGatinho} />
        </View>

        <View style={styles.areaBotoes}>

          {
          <List_Carrinho venda={object}  
          remover={removerElemento} editar={editar} />
        }   
        </View>

        <View style={styles.topPart}>

        <Text style={styles.label}>Preço Total: {totalPrice}</Text>
          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => salvaDados()}
          >
            <Text style={styles.labelBnt}>Completar compra</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}
