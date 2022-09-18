import * as SQLite from 'expo-sqlite';


export function getDbConnection() {
    const cx = SQLite.openDatabase('dbPizzaria.db');
    return cx;
}


export async function createTable() {
    return new Promise((resolve, reject) => {
        const queryPro = `CREATE TABLE IF NOT EXISTS tbProdutos
        (
            codigo text not null primary key,
            descricao text not null,
            preco text not null,      
            codigoCat text not null     
        )`;
        const queryVen = `CREATE TABLE IF NOT EXISTS tbVendas
        (
            codigo text not null primary key,
            date text not null,
            preco text not null          
        )`;
        const queryCom = `CREATE TABLE IF NOT EXISTS tbCompras
        (
            codigo text not null primary key,
            codigoVen text not null,
            codigoPro text not null,
            quantidade text not null
        )`;
        const queryCar = `CREATE TABLE IF NOT EXISTS tbCarrinho
        (
            codigo text not null primary key,
            codigoPro text not null,     
            quantidade text not null
        )`;
        const queryCat = `CREATE TABLE IF NOT EXISTS tbCategorias
        (
            codigo text not null primary key,
            categoria text not null       
        )`;

        let dbCx = getDbConnection();
        dbCx.transaction(tx => {
            tx.executeSql(
                queryPro, [],
                (tx, resultado) => resolve(true)
            )
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(
                queryVen, [],
                (tx, resultado) => resolve(true)
            )
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(
                queryCat, [],
                (tx, resultado) => resolve(true)
            )
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(
                queryCom, [],
                (tx, resultado) => resolve(true)
            )
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
        dbCx.transaction(tx => {
            tx.executeSql(
                queryCar, [],
                (tx, resultado) => resolve(true)
            )
        },
            error => {
                console.log(error);
                resolve(false);
            }
        );
    });
};




