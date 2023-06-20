import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class UrlModel{

    constructor(
        public type: string,
        public url: string,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class UrlAdapter implements Adapter<UrlModel>{
    adapt(item: any): UrlModel {
        return new UrlModel(
            item.type,
            item.url,
            )
    }
}