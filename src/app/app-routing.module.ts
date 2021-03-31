import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'tespih',
    loadChildren: () => import('./tespih/tespih.module').then( m => m.TespihPageModule)
  },
  {
    path: 'odbrojavanje',
    loadChildren: () => import('./odbrojavanje/odbrojavanje.module').then( m => m.OdbrojavanjePageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'recepti',
    loadChildren: () => import('./recepti/recepti.module').then( m => m.ReceptiPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
