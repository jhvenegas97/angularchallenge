import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class EventModel{

    constructor(
        public resourceURI: string,
        public name: string,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class EventAdapter implements Adapter<EventModel>{
    adapt(item: any): EventModel {
        return new EventModel(
            item.resourceURI,
            item.name,
            )
    }
}