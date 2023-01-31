import express, { Request, Response } from 'express';
import cors from "cors"
// import { db } from './database/BaseDatabase';
import { TVideos } from './types'
import { Video } from './models/Video';
import { DefaultDeserializer } from 'v8';
import { VideoDataBase } from './database/VideoDatabase';

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, ()=>{
    console.log(`Servidor rodando na porta ${3003}`)
} )

app.get("/ping", (req:Request, res:Response)=>{
    try {
        res.status(200).send({message: "Pong"})
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//getAll Videos
app.get("/videos", async (req:Request, res:Response)=>{
    try {

        // let videosDB

        // const result:TVideos[] = await db("videos")
        // videosDB = result

        const videoDataBase = new VideoDataBase()
        const videosDB = await videoDataBase.findVideos()

        const videos: Video[]= videosDB.map((videoDB) =>
            new Video(
                videoDB.id,
                videoDB.title,
                videoDB.duration,
                videoDB.upload_dt
            )
        )
       res.status(200).send(videos) 
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/videos", async(req:Request, res: Response)=>{
    try {
        const {id, title, duration} = req.body

        if (id === "undefined"){
            res.status(400)
            throw new Error("Favor, informar uma 'id'")
        }

        const videoDataBase = new VideoDataBase()
        const searchVideo = await videoDataBase.findVideosbyId(id)
        // const [searchVideo] = await db("videos").where({id})
        console.log(searchVideo)
        if(searchVideo){
            res.status(400)
            throw new Error("Video já existente na base de dados")
        }

        const newVideo = new Video (
            id,
            title,
            duration,
            new Date().toISOString()
            )
        
        const newVideoDB:TVideos={
            id: newVideo.getId(),
            title: newVideo.getTitle(),
            duration: newVideo.getDuration(),
            upload_dt: newVideo.getUploadDt()
        }

        await videoDataBase.insertVideo(newVideoDB)
        res.status(200).send("Video cadastrado com sucesso!")
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// app.put('/videos/:id', async(req:Request, res:Response)=>{
//     try {
//         const id = req.params.id

//         const [searchVideo]:TVideos [] | undefined[] = await db("videos").where({id})

//         const newId = req.body.id as string | undefined
//         const newTitle = req.body.title as string | undefined
//         const newDuration = req.body.duration as string | undefined
        
//         if(!searchVideo){
//             res.status(400)
//             throw new Error("Video não encontrado");            
//         }

//         const updateVideo = new Video (
//             newId,
//             newTitle,
//             newDuration,
//             new Date().toISOString()
//             )

//         const updateVideoDB:TVideos={
//             id: updateVideo.getId() || searchVideo.id,
//             title: updateVideo.getTitle() || searchVideo.title,
//             duration: updateVideo.getDuration() || searchVideo.duration,
//             upload_dt: updateVideo.getUploadDt() || searchVideo.upload_dt,
//         }
        
//         await db("videos").update(updateVideoDB).where({id:id})
//         res.status(200).send("Atualização realizada com sucesso!")

//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })

// app.delete('/videos/:id', async(req: Request, res:Response)=>{
//     try {

//         const id = req.params.id

//         const [searchVideo]:TVideos[] | undefined[]= await db("videos").where({id})

//         if(!searchVideo){
//             res.status(400)
//             throw new Error("Video não encontrado")
//         }else{

//             new Video (
//                 searchVideo.id,
//                 searchVideo.title,
//                 searchVideo.duration,
//                 searchVideo.upload_dt
//             )

//             db("videos").del().where({id:id})
//             res.status(200).send("Video excluido com sucesso!")
//         }
        
//     } catch (error) {
//         console.log(error)

//         if (req.statusCode === 200) {
//             res.status(500)
//         }

//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         }
//     }
// })