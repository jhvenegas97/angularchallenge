import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class MarvelResponseDataModel{

    constructor(
        public offset: number,
        public limit: number,
        public total: number,
        public count: number,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class MarvelResponseDataAdapter implements Adapter<MarvelResponseDataModel>{
    adapt(item: any): MarvelResponseDataModel {
        return new MarvelResponseDataModel(
            item.offset,
            item.limit,
            item.total,
            item.count
            )
    }
}