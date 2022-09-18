import { react } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import { adicionaProduto, alteraProduto } from "../../services/dbpro";
import { obtemTodasCategorias } from "../../services/dbcat";
import IconeGatinho from "../../assets/img/chef-cat-modified.png";
import { ScrollView } from "react-native-gesture-handler";

export default function Tela1({ navigation }) {
  var cat = [];
  const [codigo, setCodigo] = useState(undefined);
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigoCat, setCodigoCat] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(cat);
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }
  async function processamentoUseEffect() {
    let obj = await obtemTodasCategorias();
    for (let i = 0; i < obj.length; i++) {
      cat.push({
        label: obj[i].descricao,
        value: obj[i].codigo,
      });
    }

    if (navigation.getParam("produto", undefined) != undefined) {
      let object = navigation.getParam("produto");
      setCodigo(object.codigo);
      setDescricao(object.descricao);
      setPreco(object.preco);
      setCodigoCat(object.codigoCat);
      setValue
    }
    console.log("UseEffect...");
    setItems(cat);
  }

  useEffect(() => {
    console.log("executando useffect");
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);
  async function limparCampos() {
    setDescricao("");
    setPreco("");
    Keyboard.dismiss();
  }

  async function salvaDados() {
    let novoRegistro = codigo == undefined;

    let obj = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      descricao: descricao,
      preco: preco,
      codigoCat: codigoCat,
    };

    console.log(obj.codigoCat);

    console.log(obj.codigo);
    try {
      if (novoRegistro) {
        let resposta = await adicionaProduto(obj);

        if (resposta)
          Alert.alert("Alerta", "adicionado com sucesso!", ["Ok", "Cancel"]);
        else Alert.alert("Alerta", "Falhou miseravelmente!", ["Ok", "Cancel"]);
      } else {
        let resposta = await alteraProduto(obj);
        if (resposta)
          Alert.alert("Alerta", "Alterado com sucesso!", ["Ok", "Cancel"]);
        else Alert.alert("Alerta", "Falhou miseravelmente!", ["Ok", "Cancel"]);
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
        <View style={styles.areaBotoes}>
          <Text style={styles.title}>Nova Pizza</Text>

          <Image style={styles.imagem} source={IconeGatinho} />

          <Text style={styles.label}>Descrição </Text>
          <TextInput
            onChangeText={(texto) => setDescricao(texto)}
            value={descricao.toString()}
            style={styles.caixaTexto}
          />
          <Text style={styles.label}>Preço unitário</Text>
          <TextInput
            keyboardType="numeric"
            onChangeText={(texto) => setPreco(texto)}
            value={preco.toString()}
            style={styles.caixaTexto}
          />
          <Text style={styles.label}>Categoria</Text>
          <DropDownPicker
            listMode="SCROLLVIEW"
            defaultValue={codigoCat}
            style={styles.caixadropdown}
            open={open}
            value={value}
            items={items}
            onChangeValue={(texto) => setCodigoCat(texto)}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={styles.botaoGrande}
              onPress={() => salvaDados()}
            >
              <Text style={styles.labelBnt}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoGrande}
              onPress={() => navigation.navigate("list_pizzas")}
            >
              <Text style={styles.labelBnt}>Ver Produtos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
