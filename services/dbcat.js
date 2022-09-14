import * as SQLite from 'expo-sqlite';

export function obtemTodasCategorias() {

    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategorias';
            tx.executeSql(query, [],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            categoria: registros.rows.item(n).categoria,
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

export function obtemUmaCategoria(codigo) {
    return new Promise((resolve, reject) => {

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            let query = 'select * from tbCategorias where codigo=?';
            tx.executeSql(query, [categoria.codigo],
                (tx, registros) => {

                    var retorno = []

                    for (let n = 0; n < registros.rows.length; n++) {
                        let obj = {
                            codigo: registros.rows.item(n).codigo,
                            categoria: registros.rows.item(n).categoria,
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

export function adicionacategoria(categoria) {

    return new Promise((resolve, reject) => {
        let query = 'insert into tbcategorias (codigo, categoria ,telefone) values (?,?,?)';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [categoria.codigo, categoria.categoria, categoria.telefone],
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


export function alteracategoria(categoria) {
    console.log('começando o método alteracategoria');
    return new Promise((resolve, reject) => {
        let query = 'update tbcategorias set categoria=?, telefone=? where codigo=?';
        let dbCx = getDbConnection();

        dbCx.transaction(tx => {
            tx.executeSql(query, [categoria.categoria, categoria.telefone, categoria.codigo],
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



export function excluicategoria(codigo) {
    console.log('Apagando categoria ' + codigo);
    return new Promise((resolve, reject) => {
        let query = 'delete from tbcategorias where codigo=?';
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


export function excluiTodoscategorias() {
    console.log("Apagando todos os categorias...");
    return new Promise((resolve, reject) => {
        let query = 'delete from tbcategorias';
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