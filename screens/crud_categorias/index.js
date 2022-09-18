import { react } from "react";
import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/chef-2-cats-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import { adicionaCategoria, alteraCategoria } from "../../services/dbcat";

export default function Tela1({ navigation }) {
  const [codigo, setCodigo] = useState(undefined);
  const [categoria, setCategoria] = useState();
  const [descricao, setDescricao] = useState("");

  async function processamentoUseEffect() {
    console.log("UseEffect...");
    if (navigation.getParam("categoria", undefined) != undefined) {
      let object = navigation.getParam("categoria");
      setCodigo(object.codigo);
      setDescricao(object.categoria);
    }
  }

  useEffect(() => {
    console.log("executando useffect");
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function salvaDados() {
    let novoRegistro = codigo == undefined;

    let obj = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      descricao: descricao,
    };

    console.log(obj.codigo);
    try {
      if (novoRegistro) {
        let resposta = await adicionaCategoria(obj);

        if (resposta)
          Alert.alert("Alerta", "adicionado com sucesso!", ["Ok", "Cancel"]);
        else Alert.alert("Alerta", "Falhou miseravelmente!", ["Ok", "Cancel"]);
      } else {
        let resposta = await alteraCategoria(obj);
        if (resposta)
          Alert.alert("Alerta", "Alterado com sucesso!", ["Ok", "Cancel"]);
        else Alert.alert("Alerta", "Falhou miseravelmente!", ["Ok", "Cancel"]);
      }
    } catch (e) {
      Alert.alert(e.message);
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
        <View style={styles.areaBotoes}>
          <Text style={styles.title}>Nova Categoria</Text>

          <Image style={styles.imagem} source={IconeGatinho} />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            onChangeText={(texto) => setDescricao(texto)}
            value={descricao.toString()}
            style={styles.caixaTexto}
          />

          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => salvaDados()}
          >
            <Text style={styles.labelBnt}>Adicionar categoria</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => navigation.navigate("list_categorias")}
          >
            <Text style={styles.labelBnt}>Ver Categorias</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
