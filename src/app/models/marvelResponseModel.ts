import { Injectable } from "@angular/core";
import { MarvelResponseDataAdapter, MarvelResponseDataModel } from "./marvelResponseData";
import { CharacterAdapter, CharacterModel } from "./characterModel";
import { Adapter } from "../interfaces/adapter";

export class MarvelResponseModel{

    constructor(
        public code: number,
        public status: string,
        public copyright: string,
        public attributionText: string,
        public attributionHTML: string,
        public etag: string,
        public data: MarvelResponseDataModel,
        public results: CharacterModel[]
    ){}
}

@Injectable({
    providedIn: "root",
})
export class MarvelResponseAdapter implements Adapter<MarvelResponseModel>{
    charactersAdapter: CharacterAdapter = new CharacterAdapter();
    adapt(item: any): MarvelResponseModel {
        return new MarvelResponseModel(
            item.code,
            item.status,
            item.copyright,
            item.attributionText,
            item.attributionHTML,
            item.etag,
            new MarvelResponseDataModel(item['data'].offset,item['data'].limit,item['data'].total,item['data'].count),
            item['data']['results'] != undefined ? item['data']['results'].map((element: any)=>{return this.charactersAdapter.adapt(element)}) : null,
            )
    }
}