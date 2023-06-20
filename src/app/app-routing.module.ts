import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/modules/main/main.module').then((m) => m.MainModule),
    canActivate: [],    
  },
  {
    path: 'character/details',
    loadChildren: () =>
      import('src/app/modules/details/details.module').then((m) => m.DetailsModule),
    canActivate: [],    
  },
  {
    path: 'error',
    loadChildren: () =>
      import('src/app/modules/shared/shared.module').then((m) => m.SharedModule),
    canActivate: [],    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
