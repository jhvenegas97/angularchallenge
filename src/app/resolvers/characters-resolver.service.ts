import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { MarvelResponseModel } from "../models/marvelResponseModel";
import { DataService } from "../services/data.service";
import { MarvelRequestOptions } from "../constants/requestOptions";
import { marvelConfig } from "../constants/marvel-config";
import {catchError} from 'rxjs/operators'; 
import { EMPTY } from 'rxjs';

@Injectable({
providedIn:'root'
})


export class CharactersResolverService implements Resolve<MarvelResponseModel>{
    requestOptions!: MarvelRequestOptions;

    constructor(private dataService: DataService,public router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MarvelResponseModel | Observable<MarvelResponseModel> | Promise<MarvelResponseModel> {
        this.requestOptions = {
            limit: marvelConfig.limit,
            offset: marvelConfig.offset,
          };
          
        return this.dataService.getCharacters(this.requestOptions).pipe(
            catchError((e) => {
              this.router.navigateByUrl('/error');
              return EMPTY;
            }));
    }
}
