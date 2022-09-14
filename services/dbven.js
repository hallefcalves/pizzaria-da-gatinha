import * as SQLite from 'expo-sqlite';

export function obtemTodosvendas() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbVendas';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            produtos: registros.rows.item(n).produtos,
                            date: registros.rows.item(n).date
                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function obtemUmaVenda(codigo) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbVendas where codigo=?';
            tx.executeSql(query, [venda.codigo],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            produtos: registros.rows.item(n).produtos,
                            date: registros.rows.item(n).date

                        }
                        retorno.push(obj);
                    }
                    resolve(retorno);
                })
        },
            error => {
                console.log(error);
                resolve([]);
            }
        )
    }
    );
}

export function adicionavenda(venda) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbVendas (codigo, produtos, date) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.codigo, venda.produtos, venda.date],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function alteravenda(venda) {
    console.log('começando o método alteravenda');
    return new Promise((resolve, reject) => {
        let query = 'update tbVendas set produtos=?, date=? where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [venda.produtos, venda.date, venda.codigo],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}



export function excluivenda(codigo) {
    console.log('Apagando venda ' + codigo);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbVendas where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [codigo],
                (tx, resultado) => {
                    resolve(resultado.rowsAffected > 0);
                })
        },
            error => {
                console.log(error);
                resolve(false);
            }
        )
    }
    );
}


export function excluiTodosvendas() {
    console.log("Apagando todos os vendas...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbVendas';
        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(query, [],
                (tx, resultado) => resolve(resultado.rowsAffected > 0)
            );
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    }
    );
}