import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class SerieModel{

    constructor(
        public resourceURI: string,
        public name: string,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class SerieAdapter implements Adapter<SerieModel>{
    adapt(item: any): SerieModel {
        return new SerieModel(
            item.resourceURI,
            item.name,
            )
    }
}