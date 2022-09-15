import { react } from "react";
import {
    Alert, Text, TextInput, TouchableOpacity,
    View, Keyboard, Image
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { adicionaProduto, alteraProduto } from "../../services/dbpro";
import IconeGatinho from "../../assets/img/chef-cat-modified.png";
import { ScrollView } from "react-native-gesture-handler";

export default function Tela1({ navigation }) {
  const [codigo, setCodigo] = useState();
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [codigoCat, setCodigoCat] = useState("")
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Pizza Salgada", value: "Pizza Salgada" },
    { label: "Pizza Doce", value: "Pizza Doce" },
  ]);
  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }
  async function limparCampos() {
    setDescricao("");
    setPreco("");
    setCodigo("");
    setItems();
    Keyboard.dismiss();
  }

  async function salvaDados() {
    let novoRegistro = codigo == undefined;

    let obj = {
      codigo: novoRegistro ? createUniqueId() : codigo,
      descricao: descricao,
      preco: preco,
      codigoCat: items.values,
    };


    console.log(obj.codigo);
    try {
      if (novoRegistro) {
        let resposta = await adicionaProduto(obj);

        if (resposta) 
            Alert.alert("adicionado com sucesso!");
        else 
            Alert.alert("Falhou miseravelmente!");
      } else {
        let resposta = await alteraProduto(obj);
        if (resposta) 
            Alert.alert("Alterado com sucesso!");
        else 
            Alert.alert("Falhou miseravelmente!");
      }

      Keyboard.dismiss();
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e);
    }
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD

       <TouchableOpacity
            style={styles.botaoPequeno}
            onPress={() => navigation.navigate("menu")}
          >
            <Text style={styles.labelBnt}>Voltar</Text>
          </TouchableOpacity>

      <ScrollView contentContainerStyle = {{flexGrow:1}}>


          <View style={styles.areaBotoes}>
=======
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          style={styles.botaoPequeno}
          onPress={() => navigation.navigate("menu")}
        >
          <Text style={styles.labelBnt}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.areaBotoes}>
>>>>>>> fb857c69656d8a8742f8a592c2a7e827aeefce69
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
            style={styles.caixadropdown}
            open={open}
            value={value}
            items={items}
            onChangeSearchText={(texto)=>setCodigoCat(texto)}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />

          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => salvaDados()}
          >
            <Text style={styles.labelBnt}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
