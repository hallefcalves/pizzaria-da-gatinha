import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import IconeGatinho from "../../assets/img/cat-burned-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import React, { Component } from "react";
import List_Vendas from "../../componentes/venda/index";
import {
  excluiTodasVendas,
  excluiVenda,
  obtemTodasVendas,
  obtemTodasVendasCompras,
} from "../../services/dbven";
import { excluiTodasCompras, excluiCompraVenda } from "../../services/dbcom";
import List_ProdutosVendas from "../../componentes/produtos_vendas";

export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const [preco, setPreco] = useState("");
  const [vendas, setVendas] = useState([]);
  const [compras, setCompras] = useState([]);

  async function carregaDados() {
    let objVen = await obtemTodasVendasCompras();

    setVendas(objVen);
  }
  useEffect(() => {
    console.log("executando useffect");
    carregaDados(); //necessário método pois aqui não pode utilizar await...
  }, []);

  function editar(identificador) {
    const venda = venda.find((venda) => venda.codigo == identificador);

    if (venda != undefined) {
      setcodigo(venda.codigo);
      setNome(venda.descricao);
      setdescricao(venda.data);
    }

    console.log(venda);
  }

  function removerElemento(identificador) {
    Alert.alert("Atenção", "Confirma a remoção do venda?", [
      {
        text: "Sim",
        onPress: () => efetivaRemoverVenda(identificador),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  async function efetivaRemoverVenda(identificador){
    try {
      await excluiCompraVenda(identificador)
      await excluiVenda(identificador)
    } catch (error) {
      Alert.alert(error.toString())
    }
    carregaDados()
  }

  async function apagaVendasCompras() {
    try {
      await excluiTodasCompras();
      await excluiTodasVendas();
    } catch (error) {
      Alert.alert(error.toString())
    }
    
    carregaDados();
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
          <Text style={styles.title}>Vendas</Text>
          <Image style={styles.imagem} source={IconeGatinho} />
        </View>
        <View style={styles.areaBotoes}>
          {vendas.map((venda, index) => (
            <>
              <List_Vendas
                venda={venda}
                index={index}
                removerElemento={removerElemento}
                editar={editar}
              />
              <Text style={styles.title}>{"\n"}Produtos</Text>

              <List_ProdutosVendas
                venda={venda}
                index={index}
              ></List_ProdutosVendas>
            </>
          ))}
        </View>

        <TouchableOpacity
          style={styles.botaoPequeno}
          onPress={() => apagaVendasCompras()}
        >
          <Text style={styles.labelBnt}>Apaga tudo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
