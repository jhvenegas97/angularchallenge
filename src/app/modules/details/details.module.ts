import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from 'src/app/services/data.service';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterByIDResolverService } from 'src/app/resolvers/characterByID-resolver.service';
import { SeriesByCharacterIDResolverService } from 'src/app/resolvers/seriesByCharacterID-resolver.service';
import { ComicsByCharacterIDResolverService } from 'src/app/resolvers/comicsByCharacterID-resolver.service';
import { EventsByCharacterIDResolverService } from 'src/app/resolvers/eventsByCharacterID-resolver.service';

const routes: Routes = [
  {
    path: ':id',
    component: CharacterDetailComponent,
    canActivate: [],
    pathMatch: 'full',
    resolve: {
      character: CharacterByIDResolverService,
      series: SeriesByCharacterIDResolverService,
      comics: ComicsByCharacterIDResolverService,
      events: EventsByCharacterIDResolverService
    }
  },
];

@NgModule({
  declarations: [CharacterDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  exports: [RouterModule,MatDialogModule],
  providers: [DataService,CharacterByIDResolverService,SeriesByCharacterIDResolverService,ComicsByCharacterIDResolverService,EventsByCharacterIDResolverService]
})
export class DetailsModule { }
