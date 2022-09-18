import { react } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/cat-puff-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import {
  excluiCarrinho,
  excluiTodosCarrinhos,
  obtemCarrinho,
} from "../../services/dbcar";
import { adicionaVenda } from "../../services/dbven";
import { adicionaCompra } from "../../services/dbcom";
import List_Carrinho from "../../componentes/carrinho/index";
import moment from 'moment';

export default function Tela1({ navigation }) {
  let quin = [];
  let codex = [];
  let time;
  const [medium, setMedium] = useState();
  const [today, setToday] = useState();
  const [codPro, setCodPro] = useState([]);
  const [quant, setQuant] = useState([]);
  const [codigo, setCodigo] = useState(undefined);
  const [totalPrice, setTotalPrice] = useState();
  const [carrinhos, setCarrinhos] = useState([]);

  async function carregaDados() {
    let obj = await obtemCarrinho();
    for (i = 0; i < obj.length; i++) {
      codex.push(obj[i].codigoPro);
      quin.push(obj[i].quantidade);
    }
    time = Date.now();
    setMedium(moment(new Date(time)).format('DD/MM/YYYY'));
    setToday(medium)
    setCodPro(codex);
    setQuant(quin);
    setCarrinhos(obj);
    getTotalPrice(obj);
  }

  function getTotalPrice(obj) {
    console.log("rodou");
    let value = 0;
    for (let i = 0; i < obj.length; i++) {
      let element =
        parseInt(obj[i].preco) *
        parseInt(obj[i].quantidade);
      value += element;
    }
    setTotalPrice(value);
  }

  useEffect(() => {
    console.log("executando useffect");
    carregaDados(); //necessário método pois aqui não pode utilizar await...
  }, []);

  function editar(identificador) {
    const carrinho = carrinhos.find(
      (carrinhos) => carrinhos.codigo == identificador
    );

    if (carrinho != undefined) {
      setCodigo(carrinho.codigo);
      setNome(carrinho.descricao);
      setDescricao(carrinho.data);
    }

    console.log(carrinho);
    carregaDados();
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do carrinho?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverCarrinho(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function efetivaRemoverCarrinho(identificador) {
    excluiCarrinho(identificador);
    carregaDados();
  }

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }
  async function salvaDados(codPro, quant) {
    let novoRegistro = codigo == undefined;

    let objVen = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      date: medium,
      preco: totalPrice,
    };
    console.log(codPro[0])

    try {
      console.log(objVen);
      let resposta = await adicionaVenda(objVen);
      console.log(codPro[0])
      if (resposta) {
        for (i = 0; i < carrinhos.length; i++) {

          let objCom = {
            codigo: novoRegistro ? createUniqueId() : codigo,
            codigoVen: objVen.codigo,
            quantidade: quant[i],
            codigoPro: codPro[i],
          };
          console.log(codPro[0])
          console.log(objCom);
          resposta = await adicionaCompra(objCom);
        }
        if (resposta) {
          Alert.alert("Alerta", "Compra Concluida!", ["Ok"]);
          await excluiTodosCarrinhos();
          carregaDados()
        } else {
          Alert.alert("Alerta", "Falhou miseravelmente!", ["Ok"]);
        }
      }

      Keyboard.dismiss();
    } catch (e) {
      Alert.alert(e.toString());
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
          {carrinhos.map((carrinho, index) => (
            <List_Carrinho
              carrinho={carrinho}
              index={index}
              removerElemento={removerElemento}
              editar={editar}
            />
          ))}
        </View>

        <View style={styles.topPart}>
          <Text style={styles.label}>Preço Total: R$ {totalPrice},00</Text>
          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => salvaDados(codPro, quant)}
          >
            <Text style={styles.labelBnt}>Completar compra</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
