import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterModel } from 'src/app/models/characterModel';
import { ComicDetailModel } from 'src/app/models/comicDetailModel';
import { EventsModel } from 'src/app/models/eventsModel';
import { SeriesModel } from 'src/app/models/seriesModel';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})

export class CharacterDetailComponent {

  character!: CharacterModel[];
  events!: EventsModel[];
  comics!: ComicDetailModel[];
  series!: SeriesModel[];

  constructor(private route: ActivatedRoute,public router: Router) {

    this.character = this.route.snapshot.data['character'];
    this.events = this.route.snapshot.data['events'];
    this.comics = this.route.snapshot.data['comics'];
    this.series = this.route.snapshot.data['series'];

  }

  onItemClick(url: string){
    window.open(url, "_blank");
  }

  goHome(){
    this.router.navigate(['/']);
  }
}
