import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceptiPage } from './recepti.page';

const routes: Routes = [
  {
    path: '',
    component: ReceptiPage
  },
  {
    path: 'detalji',
    loadChildren: () => import('./detalji/detalji.module').then( m => m.DetaljiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptiPageRoutingModule {}
