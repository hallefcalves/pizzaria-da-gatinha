import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fac282",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 30,
    color: "#ffff",
  },

  caixaTexto: {
    borderRadius: 5,
    borderColor: "#ffff",
    borderWidth: 4,
    width: 250,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
  },

  caixaSenha: {
    borderRadius: 5,
    borderColor: "#ffff",
    borderWidth: 4,
    width: "40%",
    height: 60,
    fontSize: 20,
    justifyContent: "space-evenly",
    textAlign: "center",
  },

  botaoPequeno: {
    marginTop: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: "#60bd90",
    borderRadius: 10,
    borderColor: "#ffff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoGrande: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    width: 100,
    height: 60,
    backgroundColor: "#60bd90",
    borderRadius: 10,
    borderColor: "#ffff",
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  legendaCaixaTexto: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
    color: "#ffff",
  },

  imagem: {
    width: "17%",
    height: "10%",
  },

  areaBotoes: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default styles;
