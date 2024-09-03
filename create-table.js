import { sql } from "./db.js"

// sql `DROP TABLE IF EXISTS videos;`.then(()=>{console.log("tabela Apagada")})

sql `
    CREATE TABLE videos ( 
        id          TEXT PRIMARY KEY,
        title       TEXT,
        descricao   TEXT,
        duracao     INTEGER
    );
`.then(()=>{
    console.log("Tabela criada")
})


