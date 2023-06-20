import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { SeriesModel } from "../models/seriesModel";
import {catchError} from 'rxjs/operators'; 
import { EMPTY } from 'rxjs';

@Injectable({
providedIn:'root'
})


export class SeriesByCharacterIDResolverService implements Resolve<SeriesModel[]>{
    constructor(private dataService: DataService,public router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): SeriesModel[] | Observable<SeriesModel[]> | Promise<SeriesModel[]> {
        return this.dataService.getSeriesByCharacterID(route.paramMap.get("id")!).pipe(
            catchError((e) => {
              this.router.navigateByUrl('/error');
              return EMPTY;
            }));
    }
}
