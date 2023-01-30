export class Video {

    constructor(
        private id: string,
        private title: string,
        private duration: string,
        private uploadDt: string,

    ){}

    public getId():string{
        return this.id
    }

    public setId(value:string):void{
        this.id = value
    }

    public getTitle():string{
        return this.title
    }

    public setTitle(value:string):void{
        this.title = value
    }

    public getDuration():string{
        return this.duration
    }

    public setDuration(value:string):void{
        this.duration = value
    }

    public getUploadDt():string{
        return this.uploadDt
    }

    public setUploadDt(value:string):void{
        this.uploadDt = value
    }
} 

// id: string,
// title: string,
// duration: string,
// uploadDt: string,