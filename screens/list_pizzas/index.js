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
import IconeGatinho from "../../assets/img/cat-pizza-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import List_Produtos from "../../componentes/produtos/index";
import { excluiProduto, obtemTodosProdutos } from "../../services/dbpro";

export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [codigoCat, setCodigoCat] = useState("");
  const [preco, setPreco] = useState("");
  const [produtos, setProdutos] = useState([]);

  function editar(identificador) {
    const produto = produtos.find(produto => produto.codigo == identificador);

    if (produto != undefined) {
      setCodigo(produto.codigo);
      setDescricao(produto.descricao);
      setPreco(produto.preco);
      setCodigoCat(produto.codigoCat)
    }


    console.log(produto);

    navigation.navigate("crud_produtos", {produto: produto})
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do produto?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverProduto(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }
  async function efetivaRemoverProduto(identificador) {
    try {
      await excluiProduto(identificador)
      processamentoUseEffect()
    } catch (error) {
      Alert.alert(error.toString())
    }
  }
  async function processamentoUseEffect() {
    let obj = await obtemTodosProdutos();

    console.log("UseEffect...");
    setProdutos(obj);
  }

  useEffect(() => {
    console.log("executando useffect");
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoPequeno}
        onPress={() => navigation.navigate("menu")}
      >
        <Text style={styles.labelBnt}>Voltar</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.topPart}>
          <Text style={styles.title}>Pizzas</Text>
          <Image style={styles.imagem} source={IconeGatinho} />
        </View>
        <View style={styles.areaBotoes}>
          {produtos.map((produto, index) => (
            <List_Produtos
              produto={produto}
              index={index}
              removerElemento={removerElemento}
              editar={editar}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
