import * as SQLite from "expo-sqlite";
import {getDbConnection} from "./dbservice";

export function obtemTodasCategorias() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbCategorias";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              codigo: registros.rows.item(n).codigo,
              descricao: registros.rows.item(n).descricao,
            };
            retorno.push(obj);
          }
          resolve(retorno);
        });
      },
      (error) => {
        console.log(error);
        resolve([]);
      }
    );
  });
}

export function adicionaCategoria(categoria) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbCategorias (codigo, descricao) values (?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      tx => {
        tx.executeSql(
          query,
          [categoria.codigo, categoria.descricao],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function alteraCategoria(categoria) {
  console.log("começando o método alteraCategoria");
  return new Promise((resolve, reject) => {
    let query =
      "update tbcategorias set descricao=? where codigo=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [categoria.descricao, categoria.codigo],
          (tx, resultado) => {
            resolve(resultado.rowsAffected > 0);
          }
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function excluiCategoria(codigo) {
  console.log("Apagando categoria " + codigo);
  return new Promise((resolve, reject) => {
    let query = "delete from tbcategorias where codigo=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [codigo], (tx, resultado) => {
          resolve(resultado.rowsAffected > 0);
        });
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}

export function excluiTodasCategorias() {
  console.log("Apagando todos os categorias...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbcategorias";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [], (tx, resultado) =>
          resolve(resultado.rowsAffected > 0)
        );
      },
      (error) => {
        console.log(error);
        resolve(false);
      }
    );
  });
}
