import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";
import { UrlAdapter, UrlModel } from "./urlModel";
import { ThumbnailModel } from "./thumbnailModel";

export class EventsModel{

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public start: string,
        public end: string,
        public urls: UrlModel[],
        public thumbnail: ThumbnailModel,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class EventsAdapter implements Adapter<EventsModel>{
    urlsAdapter: UrlAdapter = new UrlAdapter();

    adapt(item: any): EventsModel {
        return new EventsModel(
            item.id,
            item.title,
            item.description,
            item.start,
            item.end,
            item['urls'] != undefined ? item['urls'].map((element: any)=>{return this.urlsAdapter.adapt(element)}) : null,
            new ThumbnailModel(item['thumbnail'].path,item['thumbnail'].extension),
            )
    }
}