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
import IconeGatinho from "../../assets/img/cat-burned-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import List_Vendas from '../../componentes/venda/index'


export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [vendas, setVendas] = useState([]);

  let object = {
    codigo: '01',
    descricao: 'Mussarela',
    date: '02/08/2022'

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
 
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={styles.botaoPequeno}
          onPress={() => navigation.navigate("menu")}
        >
          <Text style={styles.labelBnt}>Voltar</Text>
        </TouchableOpacity>

        <View style={{alignItems: 'center'}}>

        <Image style={styles.imagem} source={IconeGatinho} />

        </View>
      

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.areaBotoes}>
          <Text style={styles.title}>Vendas</Text>

          {
          <List_Vendas venda={object}  
          remover={removerElemento} editar={editar} />
          
        }                   
        </View>
      </ScrollView>
    </View>
  );
}
