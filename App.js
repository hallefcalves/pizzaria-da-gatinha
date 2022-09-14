import { StatusBar } from 'expo-status-bar';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import vender from './screens/vender/index';
import crud_categorias from './screens/crud_categorias/index';
import crud_produtos from './screens/crud_produtos/index';
import list_vendas from './screens/list_vendas/index';
import menu from './screens/menu/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    menu,
    vender,
    crud_categorias,
    crud_produtos,
    list_vendas,
  })
);


export default function App() {
  return (
      <Routes/>      
  );
}

