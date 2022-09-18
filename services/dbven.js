import * as SQLite from "expo-sqlite";
import { getDbConnection } from "./dbservice";

export function obtemTodasVendas() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbVendas";
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              codigo: registros.rows.item(n).codigo,
              date: registros.rows.item(n).date,
              preco: registros.rows.item(n).preco,
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

export function obtemTodasVendasCompras() {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = `select v.codigo, c.quantidade, p.descricao, v.date, v.preco as full, p.preco as unit 
          from 
          tbCompras c
          inner join  
          tbVendas v 
          on v.codigo = c.codigoVen
          inner join 
          tbProdutos p 
          on c.codigoPro = p.codigo
          `;
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            console.log(registros.rows.item(n));
            let obj = {
              codigo: registros.rows.item(n).codigo,
              descricao: registros.rows.item(n).descricao,
              date: registros.rows.item(n).date,
              unit: registros.rows.item(n).unit,
              full: registros.rows.item(n).full,
              quantidade: registros.rows.item(n).quantidade,
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

export function adicionaVenda(venda) {
  return new Promise((resolve, reject) => {
    let query = "insert into tbVendas (codigo, date, preco) values (?,?,?)";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [venda.codigo, venda.date, venda.preco],
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

export function excluiVenda(codigo) {
  console.log("Apagando venda " + codigo);
  return new Promise((resolve, reject) => {
    let query = "delete from tbVendas where codigo=?";
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

export function excluiTodasVendas() {
  console.log("Apagando todos os vendas...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbVendas";
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
