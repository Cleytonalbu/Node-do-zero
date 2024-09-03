import { title } from "process"
import {DataBaseMemory } from "./dataBase.js"

import { fastify } from 'fastify'
import { dataBasePostgres } from "./dataBase-postgres.js"

const server = fastify()
// const dataBase = new DataBaseMemory()
const dataBase = new dataBasePostgres()

server.post("/videos", async (request, reply) => {
    const {title, descricao, duracao} = request.body
    
    await dataBase.create({
        title,
        descricao,
        duracao,
    })    
    return reply.status(201).send()
})

server.get("/videos",  async(request)=>{
    const search = request.query.search 

    console.log(search)
    const videos = await dataBase.list(search)
    
    return videos

})

server.put("/videos/:id", async( request, reply)=>{
    const videosId = request.params.id
    const {title, descricao, duracao}  = request.body

    await dataBase.update(videosId, {
        title,
        descricao, 
        duracao
    })

    return reply.status(204).send()
})

server.delete("/videos/:id", async(request, reply)=>{
    const videosId = request.params.id
    await dataBase.delete(videosId)

    return reply.status(204).send()

})



server.listen({
    port: process.env.PORT ?? 3333
})