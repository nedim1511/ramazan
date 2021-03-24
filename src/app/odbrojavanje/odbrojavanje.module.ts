import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {OdbrojavanjePageRoutingModule} from './odbrojavanje-routing.module';
import {CircleTimerModule} from '@flxng/circle-timer';
import {OdbrojavanjePage} from './odbrojavanje.page';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import {HttpClientModule} from '@angular/common/http';
import {VaktijaService} from './vaktija.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdbrojavanjePageRoutingModule,
    CircleTimerModule,
    HttpClientModule
  ],
  providers: [Geolocation, NativeGeocoder, VaktijaService],
  declarations: [OdbrojavanjePage]
})
export class OdbrojavanjePageModule {}
