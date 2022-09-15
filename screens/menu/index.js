import { react } from "react";
import {
  Text,
  Touchable,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from 'react';
import styles from "./styles";
import IconeGatinho from '../../assets/img/pizza-cat2-modified.png';



export default function Tela1({ navigation }) {
  let tabelasCriadas = false;

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      await createTable();
    }

    console.log("UseEffect...");
    await carregaDados();
  }

  useEffect(() => {
    console.log("executando useffect");
    processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
  }, []);
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Pizzaria da Gatinha</Text>
      <Text style={styles.label}>Tem a massa mais macia</Text>

      <Image
          style={styles.imagem}
          source={IconeGatinho} />
              

      <TouchableOpacity onPress={() => navigation.navigate("crud_produtos")}
      style={styles.botaoGrande}>
        <Text style={styles.labelBnt}>Nova Pizza</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("vender")}
      style={styles.botaoGrande}>
        <Text style={styles.labelBnt}>Comprar Pizza</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("list_vendas")}
      style={styles.botaoGrande}>
        <Text style={styles.labelBnt}>Vendas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("crud_categorias")}
      style={styles.botaoGrande}>
        <Text style={styles.labelBnt}>Nova Categoria</Text>
      </TouchableOpacity>
    </View>
  );
}
