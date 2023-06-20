import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router,Event } from '@angular/router';
import { filter } from 'rxjs';
import { PreviousRouteService } from './services/previous-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChallengeMarvel';
  
  loading = false
  previousUrl = "";
  currentUrl = "";

  constructor(public router: Router,private urlService: PreviousRouteService) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      }
      if (ev instanceof NavigationEnd || ev instanceof NavigationCancel || ev instanceof NavigationError) {
        this.loading = false;
      }
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
  ).subscribe((event:any) => {
    this.previousUrl = this.currentUrl;
     this.currentUrl = event.url;
     this.urlService.setPreviousUrl(this.previousUrl); 
  });
}
}
