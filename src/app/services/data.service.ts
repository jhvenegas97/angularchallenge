import { HttpClient } from '@angular/common/http';
import { marvelConfig } from 'src/app/constants/marvel-config';
import { Injectable } from '@angular/core';
import { CharacterAdapter } from 'src/app/models/characterModel';
import { Observable, timestamp } from 'rxjs';
import { CharacterModel } from 'src/app/models/characterModel';
import { MD5 } from 'crypto-js';
import { map } from 'rxjs/operators';
import { MarvelRequestOptions } from 'src/app/constants/requestOptions';
import { MarvelResponseAdapter, MarvelResponseModel } from 'src/app/models/marvelResponseModel';
import { ComicDetailAdapter, ComicDetailModel } from '../models/comicDetailModel';
import { SeriesAdapter, SeriesModel } from '../models/seriesModel';
import { EventsAdapter, EventsModel } from '../models/eventsModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private adapterMarvelResponse: MarvelResponseAdapter,
    private adapterComicDetail: ComicDetailAdapter,
    private adapterCharacterDetail: CharacterAdapter,
    private adapterSeriesModel: SeriesAdapter,
    private adapterEventsModel: EventsAdapter) { }

    

    getCharacters(requestOptions: MarvelRequestOptions) : Observable<MarvelResponseModel> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      let url = `${marvelConfig.apiURL}characters?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
      if (requestOptions) {
        Object.entries(requestOptions).forEach(([key, value]) => url += `&${key}=${value}`);
      }
  
      const apiUrl = `${marvelConfig.apiURL}characters?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}&offset=${requestOptions.offset}&limit=${requestOptions.limit}&nameStartsWith=${requestOptions.nameStartsWith}`;
  
      return this.http.get(url).pipe(
        map((result: any) => {return this.adapterMarvelResponse.adapt(result)})
      ); 
  
    }

    getComicByID(comicId: string) : Observable<ComicDetailModel[]> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      const apiUrl = `${marvelConfig.apiURL}comics/${comicId}?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
  
      return this.http.get(apiUrl).pipe(
        map((result: any) => result.data.results.map((element: any) => { return this.adapterComicDetail.adapt(element)}))
      ); 
  
    }

    getCharacterByID(characterId: string) : Observable<CharacterModel[]> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      const apiUrl = `${marvelConfig.apiURL}characters/${characterId}?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
  
      return this.http.get(apiUrl).pipe(
        map((result: any) => result.data.results.map((element: any) => { return this.adapterCharacterDetail.adapt(element)}))
      ); 
  
    }

    getComicsByCharacterID(characterId: string) : Observable<ComicDetailModel[]> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      const apiUrl = `${marvelConfig.apiURL}characters/${characterId}/comics?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
  
      return this.http.get(apiUrl).pipe(
        map((result: any) => result.data.results.map((element: any) => { return this.adapterComicDetail.adapt(element)}))
      ); 
  
    }

    getSeriesByCharacterID(characterId: string) : Observable<SeriesModel[]> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      const apiUrl = `${marvelConfig.apiURL}characters/${characterId}/series?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
  
      return this.http.get(apiUrl).pipe(
        map((result: any) => result.data.results.map((element: any) => { return this.adapterSeriesModel.adapt(element)}))
      ); 
  
    }

    getEventsByCharacterID(characterId: string) : Observable<EventsModel[]> {
      const timeStamp = new Date().getTime().toString();
      const hash = MD5(timeStamp + marvelConfig.privateKey + marvelConfig.publicKey)
  
      const apiUrl = `${marvelConfig.apiURL}characters/${characterId}/events?apikey=${marvelConfig.publicKey}&ts=${timeStamp}&hash=${hash}`;
  
      return this.http.get(apiUrl).pipe(
        map((result: any) => result.data.results.map((element: any) => { return this.adapterEventsModel.adapt(element)}))
      ); 
  
    }
}

