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
import IconeGatinho from "../../assets/img/chef-2-cats-modified.png";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, MD3Colors } from "react-native-paper";

export default function Tela1({ navigation }) {
  const [descricao, setDescricao] = useState("");
 
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
            onPress={() => navigation.navigate("menu")}
          >
            <Text style={styles.labelBnt}>Adicionar categoria</Text>
          </TouchableOpacity>

          
          <TouchableOpacity
            style={styles.botaoGrande}
            onPress={() => navigation.navigate("menu")}
          >
            <Text style={styles.labelBnt}>Ver Categorias</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
