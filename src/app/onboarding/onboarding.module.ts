import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OnboardingPageRoutingModule } from './onboarding-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { OnboardingPage } from './onboarding.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [OnboardingPage]
})
export class OnboardingPageModule {}
