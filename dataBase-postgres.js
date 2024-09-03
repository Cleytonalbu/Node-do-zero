import { randomUUID } from "crypto"
import postgres from "postgres"
import { sql } from './db.js'


export class dataBasePostgres{
   

    async list(search){
        let videos 

        if(search){
            videos = await sql `select * from videos where title ilike ${"%"+search+"%" } `
        }else{
            videos = await sql `select * from videos`
        }
        return videos
    }

    async create(video){
        const videoId = randomUUID()
        const {title, descricao, duracao} = video

        await sql`insert into videos(id, title, descricao, duracao) VALUES(${videoId}, ${title}, ${descricao}, ${duracao})`
    }

    async update(id, video){

        const {title, descricao, duracao} = video

        await sql`update videos set title = ${title}, descricao = ${descricao}, duracao = ${duracao} WHERE id = ${id}`

    }

    async delete (id, video){
        
       await sql`delete from videos where id = ${id}`
    
    }
}