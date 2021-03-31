import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReceptiPageRoutingModule } from './recepti-routing.module';

import { ReceptiPage } from './recepti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceptiPageRoutingModule
  ],
  declarations: [ReceptiPage]
})
export class ReceptiPageModule {}
