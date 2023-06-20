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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { DataService } from 'src/app/services/data.service';
import { ComicModalComponent } from './components/comic-modal/comic-modal.component';
import { CharactersResolverService } from 'src/app/resolvers/characters-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [],
    pathMatch: 'full',
    resolve: {
      characters: CharactersResolverService
    }
  },
];

@NgModule({
  declarations: [HomeComponent,ComicModalComponent],
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
    MatProgressSpinnerModule
  ],
  exports: [RouterModule,MatDialogModule],
  providers: [DataService,CharactersResolverService]
})
export class MainModule { }
