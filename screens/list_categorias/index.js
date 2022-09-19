import { react } from "react";
import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
} from "react-native";
import styles from "./styles";
import DropDownPicker from "react-native-dropdown-picker";
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/cats-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import List_categorias from "../../componentes/categoria/index";
import { excluiCategoria, obtemTodasCategorias } from "../../services/dbcat";
import { obtemProdutosCategoria } from "../../services/dbpro";

export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [codigo, setCodigo] = useState("");
  const [categorias, setCategorias] = useState([]);

  async function processamentoUseEffect() {
    let obj = await obtemTodasCategorias();

    setCategorias(obj);

  }

  useEffect(() => {
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);

  function editar(identificador) {
    const categoria = categorias.find(
      (categoria) => categoria.codigo == identificador
    );

    if (categoria != undefined) {
      setCodigo(categoria.codigo);
      setDescricao(categoria.descricao);
    }

    navigation.navigate("crud_categorias", { categoria: categoria });
  }

  async function removerElemento(identificador) {
    let obj = await obtemProdutosCategoria(identificador);
    if (obj.length === 0) {
      Alert.alert("Atenção", "Confirma a remoção do categoria?", [
        {
          text: "Sim",
          onPress: () => efetivaRemoverCategoria(identificador),
        },
        {
          text: "Não",
          style: "cancel",
        },
      ]);
    } else {
      Alert.alert(
        "Atenção",
        "Essa categoria contém produtos,\nexclua antes de apagar a categoria."
      );
    }
  }

  async function efetivaRemoverCategoria(identificador) {
    await excluiCategoria(identificador);
    processamentoUseEffect();
  }

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
          <Text style={styles.title}>Categorias</Text>
          <Image style={styles.imagem} source={IconeGatinho} />
        </View>
        <View style={styles.areaBotoes}>
          {categorias.map((categoria, index) => (
            <List_categorias
              index={index}
              categoria={categoria}
              removerElemento={removerElemento}
              editar={editar}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
