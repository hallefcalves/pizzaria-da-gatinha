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
import IconeGatinho from "../../assets/img/cats-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import List_categorias from '../../componentes/categoria/index'


export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
  const [categorias, setcategorias] = useState([]);

  let object = {
    codigo: '01',
    descricao: 'Pizza Salgada',
    data: '02/08/2022'

  }

  function editar(identificador) {
    const categoria = categoria.find(categoria => categoria.codigo == identificador);
    
    if (categoria != undefined) {
    setcodigo(categoria.codigo);
    setNome(categoria.descricao);
    setdescricao(categoria.data);
    }
    
    console.log(categoria);
    }

    function removerElemento(identificador) {
        Alert.alert('Atenção', 'Confirma a remoção do categoria?',
        [
        {
        text: 'Sim',
        onPress: () => efetivaRemovercategoria(identificador),
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
        <Text style={styles.title}>Categorias</Text>
        <Image style={styles.imagem} source={IconeGatinho} />
        </View>
        <View style={styles.areaBotoes}>

          {
          <List_categorias categoria={object}  
          remover={removerElemento} editar={editar} />
        }       

        </View>
      </ScrollView>
    </View>
  );
}
