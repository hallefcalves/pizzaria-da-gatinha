import {getDbConnection} from "./dbservice";

export function obtemCarrinho() {
  return new Promise( (resolve, reject) => {
    let dbCx =  getDbConnection();
    dbCx.transaction(
      (tx) => {
        let query = `select p.descricao, p.preco, c.codigo, c.quantidade, c.codigoPro from tbCarrinho 
                     as c inner join tbProdutos as p on c.codigoPro = p.codigo`;
        tx.executeSql(query, [], (tx, registros) => {
          var retorno = [];

          for (let n = 0; n < registros.rows.length; n++) {
            let obj = {

              descricao: registros.rows.item(n).descricao,
              codigoPro: registros.rows.item(n).codigoPro,
              codigo: registros.rows.item(n).codigo,
              quantidade: registros.rows.item(n).quantidade,
              preco: registros.rows.item(n).preco
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

export function adicionaCarrinho(carrinho) {
  return new Promise((resolve, reject) => {
    let query =
      "insert into tbCarrinho (codigo, codigoPro, quantidade) values (?,?,?)";
    let dbCx = getDbConnection();
    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [carrinho.codigo, carrinho.codigoPro, carrinho.quantidade],
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

export function alteraCarrinho(carrinho) {
  console.log("começando o método alteraCarrinho");
  return new Promise((resolve, reject) => {
    let query =
      "update tbCarrinho set quantidade=? where codigo=?";
    let dbCx = getDbConnection();

    dbCx.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [carrinho.quantidade, carrinho.codigo],
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

export function excluiCarrinho(codigo) {
  console.log("Apagando carrinho " + codigo);
  return new Promise((resolve, reject) => {
    let query = "delete from tbCarrinho where codigo=?";
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

export function excluiTodosCarrinhos() {
  console.log("Apagando todos os carrinhos...");
  return new Promise((resolve, reject) => {
    let query = "delete from tbCarrinho";
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
