import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-recepti',
  templateUrl: './recepti.page.html',
  styleUrls: ['./recepti.page.scss'],
})
export class ReceptiPage implements OnInit {

  recepti = [
    {
      id: 1,
      name: 'Turske pice',
      description: 'Tradicionalno jelo od kiselog testa koje nam dolazi iz Turske. Verujem da ste ih već videli, a neki i pravili. Testo je izvanredno mekano, punjenje po nekom njihovom receptu je samo od sira ili dinstanog...'
    },
    {
      id: 2,
      name: 'Piletina mix',
      description: 'Piletina: Pravite dan ranije ili veče pre. Potrebno nam je 3 pileća filea koje isečemo uzduž na trake. U jednu dublju posudu sipamo 300 ml mleka i jednu kašiku sirćeta i mešamo malo pa ostavimo 10 minuta...'
    },
    {
      id: 3,
      name: 'Sogan dolma',
      description: 'Podrezati vrhove na glavicama luka. Staviti glavice luka da se skuhaju u vodi, ali paziti da se ne prekuhaju. U vodu se moze dodati malo sirćeta...'
    },
    {
      id: 4,
      name: 'Kremasta piletina',
      description: 'Ovo je jedan od onih recepata gde se skoro ništa ne radi ( priznaćemo da se jelo baš ne može samo spremiti, ipak moramo nekoliko prstiju pomeriti ), a na kraju dobijete fantastičan ručak . Veoma lako...'
    },
    {
      id: 5,
      name: 'Šnicle u sosu',
      description: 'Mekane, sočne, uz njih odličan sos, sa šmekom luka. Ja ga namerno nisam mnogo usitnila, al sam ga dobro prodinstala i propržila, kako bi bio mekan i topio se u ustima, jer ko voli luk pod zubima? Niko...'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
