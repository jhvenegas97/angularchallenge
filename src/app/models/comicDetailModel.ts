import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";
import { UrlAdapter, UrlModel } from "./urlModel";
import { ThumbnailAdapter, ThumbnailModel } from "./thumbnailModel";
import { PriceAdapter, PriceModel } from "./priceModel";

export class ComicDetailModel{

    constructor(
        public id: number,
        public digitalId: number,
        public title: string,
        public issueNumber: number,
        public variantDescription: string,
        public description: string,
        public urls: UrlModel[],
        public thumbnail: ThumbnailModel,
        public images: ThumbnailModel[],
        public prices: PriceModel[],
    ){}
}

@Injectable({
    providedIn: "root",
})
export class ComicDetailAdapter implements Adapter<ComicDetailModel>{
    urlsAdapter: UrlAdapter = new UrlAdapter();
    thumbnailAdapter: ThumbnailAdapter = new ThumbnailAdapter();
    priceAdapter: PriceAdapter = new PriceAdapter();
    adapt(item: any): ComicDetailModel {
        return new ComicDetailModel(
            item.id,
            item.digitalId,
            item.title,
            item.issueNumber,
            item.variantDescription,
            item.description,
            item['urls'] != undefined ? item['urls'].map((element: any)=>{return this.urlsAdapter.adapt(element)}) : null,
            new ThumbnailModel(item['thumbnail'].path,item['thumbnail'].extension),
            item['images'] != undefined ? item['images'].map((element: any)=>{return this.thumbnailAdapter.adapt(element)}) : null,
            item['prices'] != undefined ? item['prices'].map((element: any)=>{return this.priceAdapter.adapt(element)}) : null
            )
    }
}