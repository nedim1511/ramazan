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
    // { title: 'Recepti', url: '/recepti', icon: 'pizza' },
  ];

  constructor() {}
}
