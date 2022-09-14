import { react } from 'react';
import {Text, Touchable, View,  TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';


export default function Tela1({ navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    {label: 'Pizza Salgada', value: 'Pizza Salgada'},
    {label: 'Pizza Doce', value: 'Pizza Doce'}
]);

    return (
        
        <View style={styles.container}>

            <Text style={styles.titulo}>Tela 1</Text>
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('menu')}>
                <Text>Voltar</Text>
            </TouchableOpacity>
            
            <Text>Código</Text>
            <TextInput 
            //onChangeText={(texto)=> setSenhaConf(texto)}
            //value={senhaconf.toString()}
            //style={styles.caixaSenha}
            />
            <Text>Descrição </Text>
            <TextInput 
            //onChangeText={(texto)=> setSenhaConf(texto)}
            //value={senhaconf.toString()}
            //style={styles.caixaSenha}
            />
            <Text>Preço unitário</Text>
            <TextInput 
            //onChangeText={(texto)=> setSenhaConf(texto)}
            //value={senhaconf.toString()}
            //style={styles.caixaSenha}
            />
            <Text>Categoria</Text>
            <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            />
        </View>

    );

}