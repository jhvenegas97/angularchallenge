import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../services/data.service";
import { CharacterModel } from "../models/characterModel";
import {catchError} from 'rxjs/operators'; 
import { EMPTY } from 'rxjs';

@Injectable({
providedIn:'root'
})


export class CharacterByIDResolverService implements Resolve<CharacterModel[]>{
    constructor(private dataService: DataService,public router: Router){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CharacterModel[] | Observable<CharacterModel[]> | Promise<CharacterModel[]> {
        return this.dataService.getCharacterByID(route.paramMap.get("id")!).pipe(
            catchError((e) => {
              this.router.navigateByUrl('/error');
              return EMPTY;
            }));
    }
}
