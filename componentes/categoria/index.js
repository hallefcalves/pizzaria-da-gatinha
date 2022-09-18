import {
    Text,TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import IconeMoney from "../../assets/img/money.png";
import IconeTag from "../../assets/img/tagIcon.png";



export default function List_Categorias({categoria, removerElemento, editar}) {
   return (
       <View style={{flexDirection: 'row', justifyContent: 'space-around',}} >

               <Image source={IconeTag} style={styles.icone} />
               <Text style={styles.label} >{categoria.descricao} </Text>

               <TouchableOpacity onPress={() => removerElemento(categoria.codigo)}>
                   <Ionicons name="md-remove-circle" size={32} color="#92c8d1" />
               </TouchableOpacity>

               <TouchableOpacity onPress={() => editar(categoria.codigo)}>
                   <Entypo name="edit" size={32} color="#d6a6b0" />
               </TouchableOpacity>

       </View>
   );

};