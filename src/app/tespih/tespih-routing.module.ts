import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TespihPage } from './tespih.page';

const routes: Routes = [
  {
    path: '',
    component: TespihPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TespihPageRoutingModule {}
