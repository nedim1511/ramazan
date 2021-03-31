import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetaljiPageRoutingModule } from './detalji-routing.module';

import { DetaljiPage } from './detalji.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetaljiPageRoutingModule
  ],
  declarations: [DetaljiPage]
})
export class DetaljiPageModule {}
