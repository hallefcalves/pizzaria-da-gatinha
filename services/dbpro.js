import * as SQLite from 'expo-sqlite';

export function obtemTodosprodutos() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            descricao: registros.rows.item(n).descricao,
                            preco: registros.rows.item(n).preco,
                            codigoCat: registros.rows.item(n).codigoCat
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

export function obtemUmProduto(codigo) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos where codigo=?';
            tx.executeSql(query, [produto.codigo],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            descricao: registros.rows.item(n).descricao,
                            preco: registros.rows.item(n).preco,
                            codigoCat: registros.rows.item(n).codigoCat,
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

export function obtemProdutosCategoria(codigo) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbProdutos where codigoCat=?';
            tx.executeSql(query, [produto.codigoCat],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            descricao: registros.rows.item(n).descricao,
                            preco: registros.rows.item(n).preco,
                            codigoCat: registros.rows.item(n).codigoCat,
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

export function adicionaProduto(produto) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbProdutos (codigo, descricao, preco, codigoCat) values (?,?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.codigo, produto.descricao, produto.preco, produto.codigoCat],
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


export function alteraproduto(produto) {
    console.log('começando o método alteraproduto');
    return new Promise((resolve, reject) => {
        let query = 'update tbProdutos set descricao=?, preco=?, codigoCat=? where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [produto.descricao, produto.preco, produto.codigoCat, produto.codigo],
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



export function excluiproduto(codigo) {
    console.log('Apagando produto ' + codigo);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos where codigo=?';
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


export function excluiTodosprodutos() {
    console.log("Apagando todos os produtos...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbProdutos';
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