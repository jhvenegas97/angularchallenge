import { Injectable } from "@angular/core";
import { Adapter } from "../interfaces/adapter";

export class PriceModel{

    constructor(
        public type: string,
        public price: number,
    ){}
}

@Injectable({
    providedIn: "root",
})
export class PriceAdapter implements Adapter<PriceModel>{
    adapt(item: any): PriceModel {
        return new PriceModel(
            item.type,
            item.price,
            )
    }
}