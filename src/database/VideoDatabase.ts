import { BaseDatabase } from "./BaseDatabase";
import { TVideos } from "../types";

export class VideoDataBase extends BaseDatabase {

    public static BASE_VIDEO = "videos"

    public async findVideos() {
    let videosDB

    const result:TVideos[] = await BaseDatabase.connection(VideoDataBase.BASE_VIDEO)
    videosDB = result

    return videosDB
    }

    public async findVideosbyId(id:string) {
        let videosDB
    
        const [result]:TVideos[] | undefined[] = await BaseDatabase.connection(VideoDataBase.BASE_VIDEO).where({id})
        videosDB = result
    
        return videosDB
    }

    public async insertVideo(newVideo:TVideos){
        await BaseDatabase
        .connection(VideoDataBase.BASE_VIDEO)
        .insert(newVideo)
    }
}