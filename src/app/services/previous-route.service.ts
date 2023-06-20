import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreviousRouteService {

  constructor() { }

  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(
    null!
  );
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  setPreviousUrl(previousUrl: string) {
    this.previousUrl.next(previousUrl);
  }
}
