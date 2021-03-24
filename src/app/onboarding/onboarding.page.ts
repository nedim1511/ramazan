import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  private _storage: Storage | null = null;
  shouldShow: boolean;

  constructor(private storage: Storage, private router: Router, private alertController: AlertController) {
  }

  ngOnInit() {
    this.loadStorage().then(() => {
      this._storage.get('didSeeOnboarding').then((didSeeOnboarding) => {
        if (didSeeOnboarding) {
          this.goToOdbrojavanje();
        } else {
          this.shouldShow = true;
        }
      });
    });
  }

  pocnimo() {
    this._storage.set('didSeeOnboarding', true);
    this.presentTimeModal();
  }

  private goToOdbrojavanje() {
    this.router.navigate(['/odbrojavanje']);
  }

  private async loadStorage() {
    this._storage = await this.storage.create();
  }

  private async presentTimeModal() {
    const alert = await this.alertController.create({
      header: 'Napomena',
      message: 'Da bi odbrojavanje radilo ispravno, vaše vrijeme na mobitelu mora biti tačno. ' +
        'Sada ćemo tražiti dopuštenje za lokaciju kako bi automatski odredili grad u kojem se nalazite.',
      buttons: [{
        text: 'Shvaćam',
        handler: () => {
          this.goToOdbrojavanje();
        }
      }]
    });
    await alert.present();
  }

}
