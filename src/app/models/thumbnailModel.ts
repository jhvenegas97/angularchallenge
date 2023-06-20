import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class ThumbnailModel{

    constructor(
        public path: string,
        public extension: string,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class ThumbnailAdapter implements Adapter<ThumbnailModel>{
    adapt(item: any): ThumbnailModel {
        return new ThumbnailModel(item.path,item.extension)
    }
}