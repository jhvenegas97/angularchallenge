import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class ComicModel{

    constructor(
        public resourceURI: string,
        public name: string,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class ComicAdapter implements Adapter<ComicModel>{
    adapt(item: any): ComicModel {
        return new ComicModel(
            item.resourceURI,
            item.name,
            )
    }
}