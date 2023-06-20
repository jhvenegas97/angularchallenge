import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { EventsModel } from "../models/eventsModel";
import {catchError} from 'rxjs/operators'; 
import { EMPTY } from 'rxjs';

@Injectable({
providedIn:'root'
})


export class EventsByCharacterIDResolverService implements Resolve<EventsModel[]>{
    constructor(private dataService: DataService,public router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EventsModel[] | Observable<EventsModel[]> | Promise<EventsModel[]> {
        return this.dataService.getEventsByCharacterID(route.paramMap.get("id")!).pipe(
            catchError((e) => {
              this.router.navigateByUrl('/error');
              return EMPTY;
            }));
    }
}
