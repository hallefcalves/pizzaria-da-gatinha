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
import { useState } from "react";
import IconeGatinho from "../../assets/img/cat-pizza-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import List_Produtos from '../../componentes/produtos/index'


export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [produtos, setprodutos] = useState([]);

  let object = {
    codigo: '01',
    categoria: 'Pizza Salgada',
    descricao: 'Mussarela',
    preco: 'R$ 35'

  }

  function editar(identificador) {
    const produto = produto.find(produto => produto.codigo == identificador);
    
    if (produto != undefined) {
    setcodigo(produto.codigo);
    setNome(produto.descricao);
    setdescricao(produto.data);
    }
    
    console.log(produto);
    }

    function removerElemento(identificador) {
        Alert.alert('Atenção', 'Confirma a remoção do produto?',
        [
        {
        text: 'Sim',
        onPress: () => efetivaRemoverproduto(identificador),
        },
        {
        text: 'Não',
        style: 'cancel',
        }
        ]);
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
        <Text style={styles.title}>Pizzas</Text>
        <Image style={styles.imagem} source={IconeGatinho} />
        </View>
        <View style={styles.areaBotoes}>

          {
          <List_Produtos produto={object}  
          remover={removerElemento} editar={editar} />
        }       

        </View>
      </ScrollView>
    </View>
  );
}
