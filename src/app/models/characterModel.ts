import { Injectable } from "@angular/core";
import { ThumbnailModel } from "./thumbnailModel";
import { ComicAdapter, ComicModel } from "./comicModel";
import { SerieAdapter, SerieModel } from "./serieModel";
import { EventAdapter, EventModel } from "./eventModel";
import { StoryAdapter, StoryModel } from "./storyModel";
import { UrlAdapter, UrlModel } from "./urlModel";
import { Adapter } from "../interfaces/adapter";

export class CharacterModel{

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public modified: string,
        public thumbnail: ThumbnailModel,
        public resourceURI: string,
        public comics: ComicModel[],
        public series: SerieModel[],
        public stories: StoryModel[],
        public events: EventModel[],
        public urls: UrlModel[]
    ){}
}

@Injectable({
    providedIn: "root",
})
export class CharacterAdapter implements Adapter<CharacterModel>{
    comicsAdapter: ComicAdapter = new ComicAdapter();
    seriesAdapter: SerieAdapter = new SerieAdapter();
    eventsAdapter: EventAdapter = new EventAdapter();
    storiesAdapter: StoryAdapter = new StoryAdapter();
    urlsAdapter: UrlAdapter = new UrlAdapter();
    
    adapt(item: any): CharacterModel {
        return new CharacterModel(
            item.id,
            item.name,
            item.description,
            item.modified,
            new ThumbnailModel(item['thumbnail'].path,item['thumbnail'].extension),
            item.resourceURI,
            item['comics']['items'] != undefined ? item['comics']['items'].map((element: any)=>{return this.comicsAdapter.adapt(element)}) : null,
            item['series']['items'] != undefined ? item['series']['items'].map((element: any)=>{return this.seriesAdapter.adapt(element)}) : null,
            item['stories']['items'] != undefined ? item['stories']['items'].map((element: any)=>{return this.storiesAdapter.adapt(element)}) : null,
            item['events']['items'] != undefined ? item['events']['items'].map((element: any)=>{return this.eventsAdapter.adapt(element)}) : null,
            item['urls'] != undefined ? item['urls'].map((element: any)=>{return this.urlsAdapter.adapt(element)}) : null
            )
    }
}