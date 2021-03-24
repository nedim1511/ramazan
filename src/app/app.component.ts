import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Odbrojavanje', url: '/odbrojavanje', icon: 'timer' },
    { title: 'Tespih', url: '/tespih', icon: 'ellipsis-horizontal' },
  ];

  public proizvodi = [
    { title: 'Islamske knjige', url: '/folder/Knjige', icon: 'book' },
    { title: 'Uljani mirisi', url: '/folder/Mirisi', icon: 'water' },
    { title: 'Ćurekot', url: '/folder/Ćurekot', icon: 'flower' },
    { title: 'Ostalo', url: '/folder/Ostalo', icon: 'gift' },
  ];

  constructor() {}
}
