import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild} from '@angular/core';
import {CircleTimerComponent} from '@flxng/circle-timer';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult} from '@ionic-native/native-geocoder/ngx';
import {VaktijaService} from './vaktija.service';
import {VakatMOdel} from './models/vakat.model';
import {AlertController, Platform} from '@ionic/angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-odbrojavanje',
  templateUrl: './odbrojavanje.page.html',
  styleUrls: ['./odbrojavanje.page.scss'],
})
export class OdbrojavanjePage implements AfterViewInit, OnDestroy {
  @ViewChild('timer', {static: true}) timer: CircleTimerComponent;

  startDate: any;
  duration = 10;
  gradoviVaktijaBa: Map<string, number>;
  gradoviPostanskiBroj: Map<string, string>;
  city: string;
  isIftar: boolean;
  countDownText: string;

  // Reverse Geocode
  reverseGeocodeOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  private unsubscribe$ = new Subject<void>();

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private service: VaktijaService,
    private alertController: AlertController,
    private platform: Platform,
    private ref: ChangeDetectorRef,
    private zone: NgZone
  ) {
    this.loadGradovi();
    this.loadPostanskiBrojevi();
  }

  ngAfterViewInit() {
    this.getCurrentLocation();
    this.observeApplicationReturnFromBackground();
  }

  private getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.getPostalCodeFromCoordinates(resp.coords.latitude, resp.coords.longitude, this.reverseGeocodeOptions);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private getPostalCodeFromCoordinates(latitude: number, longitude: number, options: NativeGeocoderOptions) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => this.onPostalCodeSuccess(result))
      .catch((error: any) => console.log(error));
  }

  private onPostalCodeSuccess(result: NativeGeocoderResult[]) {
    if (result && result[0]) {
      const postanskiBroj = result[0].postalCode;
      if (postanskiBroj) {
        this.city = this.gradoviPostanskiBroj.get(postanskiBroj);
        this.populateVakat();
      } else {
        this.showAlert('Greška', 'Nažalost, nemamo vrijeme iftara i sehura za grad u kojem se trenutno nalazite. Trudićemo se da dodajemo što više gradova u budućnosti. Hvala na strpljenju.');
      }
    } else {
      this.showAlert('Greška', 'Nažalost, došlo je do greške prilikom automatskog pronalaska vaše lokacije. Molimo izaberite svoj grad ručno.');
    }
  }

  private populateVakat() {
    this.service.getVrijeme(
      this.gradoviVaktijaBa.get(this.city),
      new Date().getMonth() + 1,
      new Date().getFullYear()
    ).subscribe((res) => {
      this.onPopulateVakatSuccess(res);
    });
  }

  private onPopulateVakatSuccess(res: VakatMOdel) {
    const vakat: VakatMOdel = res;
    const today = new Date();
    const todaySehur: string = vakat.dan[today.getDate() - 1].vakat[0];
    const todayIftar: string = vakat.dan[today.getDate() - 1].vakat[4];
    this.setUpTimer(todayIftar, todaySehur);
  }

  private setUpTimer(todayIftar: string, todaySehur: string) {
    const now = new Date();
    const iftarTime = this.getDateFromString(todayIftar);
    const sehurTime = this.getDateFromString(todaySehur);

    console.log(now);
    console.log(iftarTime);
    console.log(sehurTime);

    if (now > sehurTime && now < iftarTime) {
      this.isIftar = true;
      this.startDate = sehurTime.getTime();
      this.duration = iftarTime.getTime() - sehurTime.getTime();
    } else if (now > iftarTime) {
      this.isIftar = false;
      this.startDate = iftarTime.getTime();
      this.duration = sehurTime.getTime() + (1000 * 60 * 60 * 24) - iftarTime.getTime();
    } else {
      console.log('Neki novi nepoznati condition');
      console.log(now);
      console.log(iftarTime);
      console.log(sehurTime);
    }

    this.countDownText = this.isIftar ? 'Iftar' : 'Sehur';
    this.timer.init();
    this.timer.duration = this.duration;
    this.timer.startDate = this.startDate;
    this.timer.start(this.startDate);
  }

  private getDateFromString(date: string): Date {
    const today = new Date();
    const splitTime: string[] = date.split(':');
    const time = Number(splitTime[0]);
    const minutes = Number(splitTime[1]);
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), time, minutes, today.getSeconds(), today.getMilliseconds());
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  odbrojano() {
    this.showAlert(
      'Ugodan ' + (this.isIftar ? 'iftar!' : 'post!'),
      'Da vam Allah dž.š. ' + (this.isIftar ? 'ukabuli i primi' : 'olakša i ukabuli') + ' današnji post.');
    this.isIftar = !this.isIftar;
    this.populateVakat();
  }

  private observeApplicationReturnFromBackground() {
    this.platform.resume.pipe(takeUntil(this.unsubscribe$)).subscribe(async () => {
      this.ref.detectChanges();
      this.zone.run(() => {
        setTimeout(() => {
          this.populateVakat();
        }, 100);
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private loadGradovi() {
    this.gradoviVaktijaBa = new Map<string, number>();
    this.gradoviVaktijaBa.set('Banovići', 0);
    this.gradoviVaktijaBa.set('Banja Luka', 1);
    this.gradoviVaktijaBa.set('Bihać', 2);
    this.gradoviVaktijaBa.set('Bijeljina', 3);
    this.gradoviVaktijaBa.set('Bileća', 4);
    this.gradoviVaktijaBa.set('Bosanski Brod', 5);
    this.gradoviVaktijaBa.set('Bosanska Dubica', 6);
    this.gradoviVaktijaBa.set('Bosanska Gradiška', 7);
    this.gradoviVaktijaBa.set('Bosansko Grahovo', 8);
    this.gradoviVaktijaBa.set('Bosanska Krupa', 9);
    this.gradoviVaktijaBa.set('Bosanski Novi', 10);
    this.gradoviVaktijaBa.set('Bosanski Petrovac', 11);
    this.gradoviVaktijaBa.set('Bosanski Šamac', 12);
    this.gradoviVaktijaBa.set('Bratunac', 13);
    this.gradoviVaktijaBa.set('Brčko', 14);
    this.gradoviVaktijaBa.set('Breza', 15);
    this.gradoviVaktijaBa.set('Bugojno', 16);
    this.gradoviVaktijaBa.set('Busovača', 17);
    this.gradoviVaktijaBa.set('Bužim', 18);
    this.gradoviVaktijaBa.set('Cazin', 19);
    this.gradoviVaktijaBa.set('Čajniče', 20);
    this.gradoviVaktijaBa.set('Čapljina', 21);
    this.gradoviVaktijaBa.set('Čelić', 22);
    this.gradoviVaktijaBa.set('Čelinac', 23);
    this.gradoviVaktijaBa.set('Čitluk', 24);
    this.gradoviVaktijaBa.set('Derventa', 25);
    this.gradoviVaktijaBa.set('Doboj', 26);
    this.gradoviVaktijaBa.set('Donji Vakuf', 27);
    this.gradoviVaktijaBa.set('Drvar', 28);
    this.gradoviVaktijaBa.set('Foča', 29);
    this.gradoviVaktijaBa.set('Fojnica', 30);
    this.gradoviVaktijaBa.set('Gacko', 31);
    this.gradoviVaktijaBa.set('Glamoč', 32);
    this.gradoviVaktijaBa.set('Goražde', 33);
    this.gradoviVaktijaBa.set('Gornji Vakuf', 34);
    this.gradoviVaktijaBa.set('Gračanica', 35);
    this.gradoviVaktijaBa.set('Gradačac', 36);
    this.gradoviVaktijaBa.set('Grude', 37);
    this.gradoviVaktijaBa.set('Hadžići', 38);
    this.gradoviVaktijaBa.set('Han-Pijesak', 39);
    this.gradoviVaktijaBa.set('Hlivno', 40);
    this.gradoviVaktijaBa.set('Ilijaš', 41);
    this.gradoviVaktijaBa.set('Jablanica', 42);
    this.gradoviVaktijaBa.set('Jajce', 43);
    this.gradoviVaktijaBa.set('Kakanj', 44);
    this.gradoviVaktijaBa.set('Kalesija', 45);
    this.gradoviVaktijaBa.set('Kalinovik', 46);
    this.gradoviVaktijaBa.set('Kiseljak', 47);
    this.gradoviVaktijaBa.set('Kladanj', 48);
    this.gradoviVaktijaBa.set('Ključ', 49);
    this.gradoviVaktijaBa.set('Konjic', 50);
    this.gradoviVaktijaBa.set('Kotor-Varoš', 51);
    this.gradoviVaktijaBa.set('Kreševo', 52);
    this.gradoviVaktijaBa.set('Kupres', 53);
    this.gradoviVaktijaBa.set('Laktaši', 54);
    this.gradoviVaktijaBa.set('Lopare', 55);
    this.gradoviVaktijaBa.set('Lukavac', 56);
    this.gradoviVaktijaBa.set('Ljubinje', 57);
    this.gradoviVaktijaBa.set('Ljubuški', 58);
    this.gradoviVaktijaBa.set('Maglaj', 59);
    this.gradoviVaktijaBa.set('Modriča', 60);
    this.gradoviVaktijaBa.set('Mostar', 61);
    this.gradoviVaktijaBa.set('Mrkonjić-Grad', 62);
    this.gradoviVaktijaBa.set('Neum', 63);
    this.gradoviVaktijaBa.set('Nevesinje', 64);
    this.gradoviVaktijaBa.set('Novi Travnik', 65);
    this.gradoviVaktijaBa.set('Odžak', 66);
    this.gradoviVaktijaBa.set('Olovo', 67);
    this.gradoviVaktijaBa.set('Orašje', 68);
    this.gradoviVaktijaBa.set('Pale', 69);
    this.gradoviVaktijaBa.set('Posušje', 70);
    this.gradoviVaktijaBa.set('Prijedor', 71);
    this.gradoviVaktijaBa.set('Prnjavor', 72);
    this.gradoviVaktijaBa.set('Prozor', 73);
    this.gradoviVaktijaBa.set('Rogatica', 74);
    this.gradoviVaktijaBa.set('Rudo', 75);
    this.gradoviVaktijaBa.set('Sanski Most', 76);
    this.gradoviVaktijaBa.set('Sarajevo', 77);
    this.gradoviVaktijaBa.set('Skender-Vakuf', 78);
    this.gradoviVaktijaBa.set('Sokolac', 79);
    this.gradoviVaktijaBa.set('Srbac', 80);
    this.gradoviVaktijaBa.set('Srebrenica', 81);
    this.gradoviVaktijaBa.set('Srebrenik', 82);
    this.gradoviVaktijaBa.set('Stolac', 83);
    this.gradoviVaktijaBa.set('Šekovići', 84);
    this.gradoviVaktijaBa.set('Šipovo', 85);
    this.gradoviVaktijaBa.set('Široki Brijeg', 86);
    this.gradoviVaktijaBa.set('Teslić', 87);
    this.gradoviVaktijaBa.set('Tešanj', 88);
    this.gradoviVaktijaBa.set('Tomislav-Grad', 89);
    this.gradoviVaktijaBa.set('Travnik', 90);
    this.gradoviVaktijaBa.set('Trebinje', 91);
    this.gradoviVaktijaBa.set('Trnovo', 92);
    this.gradoviVaktijaBa.set('Tuzla', 93);
    this.gradoviVaktijaBa.set('Ugljevik', 94);
    this.gradoviVaktijaBa.set('Vareš', 95);
    this.gradoviVaktijaBa.set('Velika Kladuša', 96);
    this.gradoviVaktijaBa.set('Visoko', 97);
    this.gradoviVaktijaBa.set('Višegrad', 98);
    this.gradoviVaktijaBa.set('Vitez', 99);
    this.gradoviVaktijaBa.set('Vlasenica', 100);
    this.gradoviVaktijaBa.set('Zavidovići', 101);
    this.gradoviVaktijaBa.set('Zenica', 102);
    this.gradoviVaktijaBa.set('Zvornik', 103);
    this.gradoviVaktijaBa.set('Žepa', 104);
    this.gradoviVaktijaBa.set('Žepče', 105);
    this.gradoviVaktijaBa.set('Živinice', 106);
    this.gradoviVaktijaBa.set('Bijelo Polje', 107);
    this.gradoviVaktijaBa.set('Gusinje', 108);
    this.gradoviVaktijaBa.set('Nova Varoš', 109);
    this.gradoviVaktijaBa.set('Novi Pazar', 110);
    this.gradoviVaktijaBa.set('Plav', 111);
    this.gradoviVaktijaBa.set('Pljevlja', 112);
    this.gradoviVaktijaBa.set('Priboj', 113);
    this.gradoviVaktijaBa.set('Prijepolje', 114);
    this.gradoviVaktijaBa.set('Rožaje', 115);
    this.gradoviVaktijaBa.set('Sjenica', 116);
    this.gradoviVaktijaBa.set('Tutin', 117);
  }

  private loadPostanskiBrojevi() {
    this.gradoviPostanskiBroj = new Map<string, string>();
    this.gradoviPostanskiBroj.set('75290', 'Banovići');
    this.gradoviPostanskiBroj.set('78000', 'Banja Luka');
    this.gradoviPostanskiBroj.set('77000', 'Bihać');
    this.gradoviPostanskiBroj.set('76204', 'Bijeljina');
    this.gradoviPostanskiBroj.set('89230', 'Bileća');
    this.gradoviPostanskiBroj.set('74450', 'Bosanski Brod');
    this.gradoviPostanskiBroj.set('79240', 'Bosanska Dubica');
    this.gradoviPostanskiBroj.set('78400', 'Bosanska Gradiška');
    this.gradoviPostanskiBroj.set('80270', 'Bosansko Grahovo');
    this.gradoviPostanskiBroj.set('77240', 'Bosanska Krupa');
    this.gradoviPostanskiBroj.set('79220', 'Bosanski Novi');
    this.gradoviPostanskiBroj.set('77250', 'Bosanski Petrovac');
    this.gradoviPostanskiBroj.set('76230', 'Bosanski Šamac');
    this.gradoviPostanskiBroj.set('75420', 'Bratunac');
    this.gradoviPostanskiBroj.set('76100', 'Brčko');
    this.gradoviPostanskiBroj.set('71370', 'Breza');
    this.gradoviPostanskiBroj.set('70230', 'Bugojno');
    this.gradoviPostanskiBroj.set('72260', 'Busovača');
    this.gradoviPostanskiBroj.set('77245', 'Bužim');
    this.gradoviPostanskiBroj.set('77220', 'Cazin');
    this.gradoviPostanskiBroj.set('73280', 'Čajniče');
    this.gradoviPostanskiBroj.set('88300', 'Čapljina');
    this.gradoviPostanskiBroj.set('75246', 'Čelić');
    this.gradoviPostanskiBroj.set('78240', 'Čelinac');
    this.gradoviPostanskiBroj.set('88260', 'Čitluk');
    this.gradoviPostanskiBroj.set('74400', 'Derventa');
    this.gradoviPostanskiBroj.set('74101', 'Doboj');
    this.gradoviPostanskiBroj.set('70220', 'Donji Vakuf');
    this.gradoviPostanskiBroj.set('80260', 'Drvar');
    this.gradoviPostanskiBroj.set('73302', 'Foča');
    this.gradoviPostanskiBroj.set('71270 ', 'Fojnica');
    this.gradoviPostanskiBroj.set('89240', 'Gacko');
    this.gradoviPostanskiBroj.set('80230', 'Glamoč');
    this.gradoviPostanskiBroj.set('73101', 'Goražde');
    this.gradoviPostanskiBroj.set('70240', 'Gornji Vakuf');
    this.gradoviPostanskiBroj.set('75320', 'Gračanica');
    this.gradoviPostanskiBroj.set('76250', 'Gradačac');
    this.gradoviPostanskiBroj.set('88340', 'Grude');
    this.gradoviPostanskiBroj.set('71240', 'Hadžići');
    this.gradoviPostanskiBroj.set('71360', 'Han-Pijesak');
    this.gradoviPostanskiBroj.set('71380', 'Ilijaš');
    this.gradoviPostanskiBroj.set('88420', 'Jablanica');
    this.gradoviPostanskiBroj.set('70101', 'Jajce');
    this.gradoviPostanskiBroj.set('72240', 'Kakanj');
    this.gradoviPostanskiBroj.set('75260', 'Kalesija');
    this.gradoviPostanskiBroj.set('71230', 'Kalinovik');
    this.gradoviPostanskiBroj.set('71250', 'Kiseljak');
    this.gradoviPostanskiBroj.set('75280', 'Kladanj');
    this.gradoviPostanskiBroj.set('79280', 'Ključ');
    this.gradoviPostanskiBroj.set('88400', 'Konjic');
    this.gradoviPostanskiBroj.set('78220', 'Kotor-Varoš');
    this.gradoviPostanskiBroj.set('71260', 'Kreševo');
    this.gradoviPostanskiBroj.set('71260', 'Kupres');
    this.gradoviPostanskiBroj.set('78250', 'Laktaši');
    this.gradoviPostanskiBroj.set('80101', 'Livno');
    this.gradoviPostanskiBroj.set('75240', 'Lopare');
    this.gradoviPostanskiBroj.set('75300', 'Lukavac');
    this.gradoviPostanskiBroj.set('88380', 'Ljubinje');
    this.gradoviPostanskiBroj.set('88320', 'Ljubuški');
    this.gradoviPostanskiBroj.set('74250', 'Maglaj');
    this.gradoviPostanskiBroj.set('74480', 'Modriča');
    this.gradoviPostanskiBroj.set('88000', 'Mostar');
    this.gradoviPostanskiBroj.set('70260', 'Mrkonjić-Grad');
    this.gradoviPostanskiBroj.set('88390', 'Neum');
    this.gradoviPostanskiBroj.set('88280', 'Nevesinje');
    this.gradoviPostanskiBroj.set('72290', 'Novi Travnik');
    this.gradoviPostanskiBroj.set('76290', 'Odžak');
    this.gradoviPostanskiBroj.set('71340', 'Olovo');
    this.gradoviPostanskiBroj.set('76270', 'Orašje');
    this.gradoviPostanskiBroj.set('71420', 'Pale');
    this.gradoviPostanskiBroj.set('88240', 'Posušje');
    this.gradoviPostanskiBroj.set('79102', 'Prijedor');
    this.gradoviPostanskiBroj.set('78430', 'Prnjavor');
    this.gradoviPostanskiBroj.set('88440', 'Prozor');
    this.gradoviPostanskiBroj.set('73220', 'Rogatica');
    this.gradoviPostanskiBroj.set('73260', 'Rudo');
    this.gradoviPostanskiBroj.set('79260', 'Sanski Most');
    this.gradoviPostanskiBroj.set('71000', 'Sarajevo');
    this.gradoviPostanskiBroj.set('78230', 'Skender-Vakuf');
    this.gradoviPostanskiBroj.set('71350', 'Sokolac');
    this.gradoviPostanskiBroj.set('78420', 'Srbac');
    this.gradoviPostanskiBroj.set('75430', 'Srebrenica');
    this.gradoviPostanskiBroj.set('75350', 'Srebrenik');
    this.gradoviPostanskiBroj.set('88360', 'Stolac');
    this.gradoviPostanskiBroj.set('75450', 'Šekovići');
    this.gradoviPostanskiBroj.set('70270', 'Šipovo');
    this.gradoviPostanskiBroj.set('88220', 'Široki Brijeg');
    this.gradoviPostanskiBroj.set('74270', 'Teslić');
    this.gradoviPostanskiBroj.set('74260', 'Tešanj');
    this.gradoviPostanskiBroj.set('80240', 'Tomislav-Grad');
    this.gradoviPostanskiBroj.set('72290', 'Travnik');
    this.gradoviPostanskiBroj.set('89101', 'Trebinje');
    this.gradoviPostanskiBroj.set('71220', 'Trnovo');
    this.gradoviPostanskiBroj.set('75000', 'Tuzla');
    this.gradoviPostanskiBroj.set('76330', 'Ugljevik');
    this.gradoviPostanskiBroj.set('71330', 'Vareš');
    this.gradoviPostanskiBroj.set('77230', 'Velika Kladuša');
    this.gradoviPostanskiBroj.set('71300', 'Visoko');
    this.gradoviPostanskiBroj.set('73240', 'Višegrad');
    this.gradoviPostanskiBroj.set('72250', 'Vitez');
    this.gradoviPostanskiBroj.set('75440', 'Vlasenica');
    this.gradoviPostanskiBroj.set('72220', 'Zavidovići');
    this.gradoviPostanskiBroj.set('72101', 'Zenica');
    this.gradoviPostanskiBroj.set('75400', 'Zvornik');
    this.gradoviPostanskiBroj.set('73226', 'Žepa');
    this.gradoviPostanskiBroj.set('72230', 'Žepče');
    this.gradoviPostanskiBroj.set('75270', 'Živinice');
    this.gradoviPostanskiBroj.set('84000', 'Bijelo Polje');
    this.gradoviPostanskiBroj.set('84326', 'Gusinje');
    this.gradoviPostanskiBroj.set('31320', 'Nova Varoš');
    this.gradoviPostanskiBroj.set('36300', 'Novi Pazar');
    this.gradoviPostanskiBroj.set('84325', 'Plav');
    this.gradoviPostanskiBroj.set('84210', 'Pljevlja');
    this.gradoviPostanskiBroj.set('75249', 'Priboj');
    this.gradoviPostanskiBroj.set('31300', 'Prijepolje');
    this.gradoviPostanskiBroj.set('84310', 'Rožaje');
    this.gradoviPostanskiBroj.set('36310', 'Sjenica');
    this.gradoviPostanskiBroj.set('36320', 'Tutin');
  }
}
