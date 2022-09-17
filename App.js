import { StatusBar } from "expo-status-bar";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import vender from "./screens/vender/index";
import crud_categorias from "./screens/crud_categorias/index";
import crud_produtos from "./screens/crud_produtos/index";
import list_vendas from "./screens/list_vendas/index";
import list_categorias from "./screens/list_categorias/index";
import carrinho from "./screens/carrinho/index";
import list_pizzas from "./screens/list_pizzas/index";
import menu from "./screens/menu/index";

const Routes = createAppContainer(
  createSwitchNavigator({
    menu,
    vender,
    crud_categorias,
    crud_produtos,
    list_vendas,
    list_categorias,
    list_pizzas,
    carrinho
  })
);

export default function App() {
  return <Routes />;
}
