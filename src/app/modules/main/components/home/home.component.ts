import { Component, OnInit } from '@angular/core';
import { CharacterModel } from 'src/app/models/characterModel';
import { Subject } from 'rxjs';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { MarvelRequestOptions } from 'src/app/constants/requestOptions';
import { MarvelResponseModel } from 'src/app/models/marvelResponseModel';
import { MatDialog } from '@angular/material/dialog';
import { ComicModalComponent } from '../comic-modal/comic-modal.component';
import { DataService } from 'src/app/services/data.service';
import { ComicDetailModel } from 'src/app/models/comicDetailModel';
import { orderByOptions } from 'src/app/constants/marvel-config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  characters!: MarvelResponseModel;
  comic!: ComicDetailModel[];
  favouritesComics: ComicDetailModel[][] = [];
  favouritesComicsIDs: string[] = [];
  page: number = 1;
  total = 0;
  notFound = false;
  containerSize: number = 10;
  offset: number = 0;
  limit: number = 10;
  searchText$ = new Subject<string>();
  loadingData = false;

  requestOptions!: MarvelRequestOptions;
  orderBy = orderByOptions;

  constructor(private dataService: DataService, private dialog: MatDialog,private route: ActivatedRoute, public router: Router) {
    this.requestOptions = {
      limit: this.limit,
      offset: this.offset,
    };

    this.characters = this.route.snapshot.data['characters'];
  }

  ngOnInit(): void {
    this.favouritesComicsIDs =
      JSON.parse(localStorage.getItem('favouriteComics')!) == null
        ? []
        : JSON.parse(localStorage.getItem('favouriteComics')!);

    this.favouritesComics = [];

    this.favouritesComicsIDs.forEach((element) => {
      this.dataService.getComicByID(element).subscribe({
        next: (v) => {
          this.favouritesComics.push(v);
        },
        error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
        complete: () => console.log('complete'),
      });
    });

    this.search();
  }

  deleteFavouriteComic(event: any) {
    this.favouritesComicsIDs.splice(this.favouritesComicsIDs.indexOf(event.toString()),1);
    localStorage.setItem(
      'favouriteComics',
      JSON.stringify(this.favouritesComicsIDs)
    );

    this.favouritesComics = [];

    this.favouritesComicsIDs.forEach((element) => {
      this.dataService.getComicByID(element).subscribe({
        next: (v) => {
          this.favouritesComics.push(v);
        },
        error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
        complete: () => console.log('complete'),
      });
    });

  }

  onContainerDataChange(event: any): void {
    this.page = event;
    this.requestOptions.offset = (this.page - 1) * 10;
    this.dataService.getCharacters(this.requestOptions).subscribe({
      next: (v) => {
        this.characters = v;
      },
      error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
      complete: () => console.log('complete'),
    });
  }

  onComicSelected(resourceURI: string) {
    var comicID = resourceURI.substring(
      resourceURI.lastIndexOf('/') + 1,
      resourceURI.length
    );

    this.dataService.getComicByID(comicID).subscribe({
      next: (v) => {
        this.comic = v;

        var even = (element: any) => element === comicID;
        var resultData = this.favouritesComicsIDs.some(even);

        var comicPriceToShow;
        var comicPurchaseLinkToShow
        this.comic[0].urls.forEach(element => {
          if(element.type == "purchase"){
            comicPurchaseLinkToShow = element.url;
          }
        });

        this.comic[0].prices.forEach(element => {
          if(element.type == "printPrice"){
            comicPriceToShow = element.price;
          }
        });

        const dialogRef = this.dialog.open(ComicModalComponent, {
          data: { selectedComic: 1, comicData: this.comic[0], comicFavourite: resultData, comicPrice: comicPriceToShow, comicPurchaseLink: comicPurchaseLinkToShow},
          width: '600px',
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('The dialog was closed');
          
          if(result != ""){
            //TODO: move logic to service
          //REMOVE comic if added and add if there is not added
          var even = (element: any) => element === result;

          var resultData = this.favouritesComicsIDs.some(even);

          if(resultData){
            this.favouritesComicsIDs.splice(this.favouritesComicsIDs.indexOf(result.toString()),1);
          }
          else{ 
            this.favouritesComicsIDs.push(result);
          }
          
          localStorage.setItem(
            'favouriteComics',
            JSON.stringify(this.favouritesComicsIDs)
          );

          this.favouritesComics = [];

          this.favouritesComicsIDs.forEach((element) => {
            this.dataService.getComicByID(element).subscribe({
              next: (v) => {
                this.favouritesComics.push(v);
              },
              error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
              complete: () => console.log('complete'),
            });
          });
          }

        });
      },
      error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
      complete: () => console.log('complete'),
    });
  }

  onOrderBySelected(event: any) {
    this.requestOptions.orderBy = event.value;
    this.dataService.getCharacters(this.requestOptions).subscribe({
      next: (v) => {
        this.characters = v;
      },
      error: (e) => {console.log(e);this.router.navigateByUrl('/error');},
      complete: () => console.log('complete'),
    });
  }

  search() {
    this.searchText$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => this.dataService.getCharacters(this.requestOptions))
      )
      .subscribe((data) => (this.characters = data));
  }

  onSearch($event: any) {
    const searchText = ($event && $event.target && $event.target.value) || '';
    if (searchText !== this.requestOptions.nameStartsWith) {
      if (searchText) {
        this.requestOptions = {
          limit: this.limit,
          offset: 0,
          nameStartsWith: searchText,
        };
      } else {
        this.requestOptions = {
          limit: this.limit,
          offset: 0,
        };
      }
      this.total = 0;
      this.notFound = false;
      this.searchText$.next(searchText);
    }
  }

  detailCharacter(character: CharacterModel){
    this.router.navigate(['/character/details/' + character.id]);
  }
}
