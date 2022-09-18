import {getDbConnection} from "./dbservice";

export function obtemCompraVenda(codigo) {
  return new Promise((resolve, reject) => {
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = "select * from tbCompras where codigoVen=?";
        tx.executeSql(query, [codigo], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {
              codigo: registros.rows.item(n).codigo,
              codigoPro: registros.rows.item(n).codigoPro,
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

export function adicionaCompra(compra) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbCompras (codigo, codigoVen, codigoPro, quantidade) values (?,?,?,?)";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [compra.codigo, compra.codigoVen, compra.codigoPro, compra.quantidade],
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

export function excluiTodasCompras() {
  console.log("Apagando todos os compras...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbcompras";
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

export function excluiCompraVenda(codigo) {
  console.log("Apagando compras - venda: "+{codigo}+"...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbCompras where codigoVen = ?";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(query, [codigo.codigo], (tx, resultado) =>
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
