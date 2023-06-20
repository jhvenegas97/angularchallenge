import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorPageComponent,
    canActivate: [],
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [DataService]
})
export class SharedModule { }
