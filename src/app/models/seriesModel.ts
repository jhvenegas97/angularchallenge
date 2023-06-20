import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";
import { UrlAdapter, UrlModel } from "./urlModel";
import { ThumbnailModel } from "./thumbnailModel";

export class SeriesModel{

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public urls: UrlModel[],
        public startYear: string,
        public endYear: string,
        public thumbnail: ThumbnailModel,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class SeriesAdapter implements Adapter<SeriesModel>{
    urlsAdapter: UrlAdapter = new UrlAdapter();

    adapt(item: any): SeriesModel {
        return new SeriesModel(
            item.id,
            item.title,
            item.description,
            item['urls'] != undefined ? item['urls'].map((element: any)=>{return this.urlsAdapter.adapt(element)}) : null,
            item.startYear,
            item.endYear,
            new ThumbnailModel(item['thumbnail'].path,item['thumbnail'].extension),
            )
    }
}