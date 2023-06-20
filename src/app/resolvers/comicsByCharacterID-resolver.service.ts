import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { ComicDetailModel } from "../models/comicDetailModel";
import {catchError} from 'rxjs/operators'; 
import { EMPTY } from 'rxjs';

@Injectable({
providedIn:'root'
})


export class ComicsByCharacterIDResolverService implements Resolve<ComicDetailModel[]>{
    constructor(private dataService: DataService,public router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ComicDetailModel[] | Observable<ComicDetailModel[]> | Promise<ComicDetailModel[]> {
        return this.dataService.getComicsByCharacterID(route.paramMap.get("id")!).pipe(
            catchError((e) => {
              this.router.navigateByUrl('/error');
              return EMPTY;
            }));
    }
}
