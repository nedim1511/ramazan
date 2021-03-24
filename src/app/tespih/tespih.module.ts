import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TespihPageRoutingModule } from './tespih-routing.module';

import { TespihPage } from './tespih.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TespihPageRoutingModule
  ],
  declarations: [TespihPage]
})
export class TespihPageModule {}
