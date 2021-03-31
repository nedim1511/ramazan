import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetaljiPage } from './detalji.page';

const routes: Routes = [
  {
    path: ':id',
    component: DetaljiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetaljiPageRoutingModule {}
