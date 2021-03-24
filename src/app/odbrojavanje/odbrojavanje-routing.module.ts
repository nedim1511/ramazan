import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdbrojavanjePage } from './odbrojavanje.page';

const routes: Routes = [
  {
    path: '',
    component: OdbrojavanjePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdbrojavanjePageRoutingModule {}
