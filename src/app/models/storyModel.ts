import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class StoryModel{

    constructor(
        public resourceURI: string,
        public name: string,
        public type: string
    ){}
}

@Injectable({
    providedIn: "root",
})
export class StoryAdapter implements Adapter<StoryModel>{
    adapt(item: any): StoryModel {
        return new StoryModel(
            item.resourceURI,
            item.name,
            item.type
            )
    }
}