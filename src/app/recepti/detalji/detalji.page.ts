import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.page.html',
  styleUrls: ['../recepti.page.scss'],
})
export class DetaljiPage implements OnInit {
  id = this.route.snapshot.params.id;
  receptiMapper = new Map<number, { sastojci: string[], priprema: string }>();
  selectedItem: { sastojci: string[], priprema: string };

  constructor(
    private route: ActivatedRoute
  ) {
    this.populateReceptiMapper();
    this.selectedItem = this.receptiMapper.get(Number(this.id));
  }

  ngOnInit() {
  }

  private populateReceptiMapper() {
    this.receptiMapper.set(
      1,
      {
        sastojci: [
          '400ml mlijeka',
          '100ml ulja',
          '1 kašika šećera',
          '1 kašika soli',
          '2 cijela jaja',
          '850 + 50gr mekog brašna'
        ],
        priprema: 'U nekih 150 – 200ml toplog mleka razmutiti šećer, kvasac i kašičicu brašna. Ostaviti da odradi dok pripremimo ostale sastojke. Nekih 400 gr brašna staviti u posudu za mešenje pa dodati so i izmešati. Dodavati zatim redom sastojke. Preostalo mleko, skoro svo ulje ( ostaviti 2 kašike za kraj ), jedno jaje i jedno belance ( žumance isto ide za kraj ) i nadošao kvasac. Umesiti testo koje se ne lepi za ruke, ili se lepi vrlo malo od 850 gr brašna. Pouljiti sa onim ostavljenim uljem, malo premesiti i ostaviti testo da raste sat do sat ipo na toplom mestu. Nadošlo testo premesiti, pa podeliti na onoliko delova koliko pida hoćete da dobijete i da li želite veće ili manje. Ja sam delila na 8 delova. Svaki deo testa oblikovati u lopticu. Ne valjati testo predugo kako ne bi postalo žilavo i teško za ravlačenje, ali ako se to i desi samo ostavite loptice da odstoje 10 minuta i otpustiće. Razvući svaku lopticu gore – dole, a malo i sastrane. Gore sam napisala koja sam punjenja radila, tj koje sam sastojke stavljala, a na vama je da odlučite koje ćete, po vašoj želji i volji, a možete i pogledati u videu kako sam ih ja iskombinovala. Na kraju samo savijemo ivice ka unutra, a krajeve testa pritisnemo u špic i dobijemo oblik čamca. Ostavimo 30ak minuta da ostoje ( prva tura ) dok punimo drugu. Premažemo odmin preostalim žumancetom i uključimo rernu da se zagreje na 200 stepeni. Pečemo nekih 15 – 20 minuta. Pogledaje posle 15 pa vidite da li treba još, da ivice lepo porumene. Prijatno.'
      }
    );

    this.receptiMapper.set(
      2,
      {
        sastojci: [
          '3 pileća filea',
          '300ml mlijeka',
          '1 kašikica tucane',
          '1 kašika sušenog peršuna',
          '3 kašike majoneze'
        ],
        priprema: 'Piletina: Pravite dan ranije ili veče pre. Potrebno nam je 3 pileća filea koje isečemo uzduž na trake. U jednu dublju posudu sipamo 300 ml mleka i jednu kašiku sirćeta i mešamo malo pa ostavimo 10 minuta. Zašto se to baš tako radi pravo da vam kažem i ne znam, ja sam uradila i meso je bilo perfektno. Sada dodajemo začine. Jedna kašika soli, ostali začini idu po ukusu, ali stavite ih dosta. Beli luk u granulama je obavezan. Sve ostalo kako želite. Ja sam dodala dve kašičice belog luka, jednu kašičicu bibera, 1 kašičicu tucane paprike, 1 kašika sušenog peršuna, malo kurkume, malo karija i malo djumbira u prahu. Pokriti folijom i ostaviti u frižideru preko noći. Sutradan zagrejati malo više ulja pa vaditi komade, uvaljati u brašno tanko, opet zamočiti u mleko pa opet u brašno i tako peći. To je to što se tiče piletine. Pomfrit svi znamo na neki svoj način – generalno je to očisti krompir, iseci na trakice i prži u ulju, ne na najjačoj vatri, ocedi na ubrus, posoli, navali. Cane’s umak – nama je bio neobičan, u njega se umače meso i tako se jede. Ide ovako. Meša se 3 kašike majoneza, jedna kečapa, beli luk u granulama, biber i jedna kašičica Vorčerster sosa. Sjediniti, poklopiti i ostaviti u frižideru do služenja. Možete i njega praviti dan ranije. Tost sa puterom i belim lukom se pravi tako što se na jednu stranu hleba namaže puter pa se stavi na zagrejan tiganj na srednjoj vatri i odmah mažete gornju stranu. Kada se donja strana zapekla okrećete hleb, posolite i pospete granulama belog luka. Prijatno!'
      }
    );

    this.receptiMapper.set(
      3,
      {
        sastojci: [
          '600g crvenog luka',
          'Malo crvene paprike',
          'Malo sirćeta',
          '400g pavlake',
        ],
        priprema: 'Podrezati vrhove na glavicama luka. Staviti glavice luka da se skuhaju u vodi, ali paziti da se ne prekuhaju. U vodu se moze dodati malo sirćeta. Skinuti s peći, ocijediti toplu i naliti hladnu vodu. Pritiskanjem prstima istiskivati košuljice odnosno prstenove luka - dolme. Prvi sloj s ljuskom se odbacuje, a upotrebljavaju se drugi slojevi. Od jedne glavice luka dobije se više dolmi koje se pune nadjevom. Veće dolme se pune prstima, a manje čačkalicom ili dezertnim nozićem. Nadjev se priprema tako da se sitno isjecka crveni luk i izmiješa sa mljevenim mesom. Dodati biber, rižu, paradajz-pire, jaje, so i ulje. Sve dobro izmiješati. Punjene dolme luka se slažu u šerpu, zaliju toplom vodom tako da budu pokrivene, doda se malo sirćeta (ako se glavice nisu kuhale sa sirćetom), pritisnu tanjirom ili drugim poklopcem (uzim od šerpe), te stave kuhati. U kuhanu dolmu se doda malo aleve slatke paprike.Uz dolmu se servira kiselo mlijeko ili pavlaka. Prijatno!'
      }
    );

    this.receptiMapper.set(
      4,
      {
        sastojci: [
          'Pileće meso po izboru',
          'Prstohvat suhog začina',
          'Namanje 200ml vrhnja za kuhanje',
          '50-100ml ulja',
          'so i biber po želji'
        ],
        priprema: 'Batake ako je potrebno odvojimo od karabataka, katabatake zasečemo ili belo meso odkostimo. Uradite kako mislite da treba u zavisnosti kako spremate inače. Poslagati sve u jednu dublju i veću šerpu, može to biti i duboki tiganj. Pospite suvim začinom i solju. Dodajte ulje, otprilike sipajte, al nemojte piletinu zaliti kao da se kupa :D Dodati dve čaše vode pa staviti na vatru da se prvo kuva i omekša, pa onda zapeče. E sad ste uradili najveći deo posla, ostalo je jos kada provri da smanjite na srednju vatru i čekate da voda ispari. Usput povremeno okrenite, kako se tuda budete šetkali. Kada je voda isparila ostavite meso da se malo zapeče sa obe strane pa nalijte pavlaku za kuvanje, dodajte začine još po ukusu ili koje volite. Ukoliko vam je to malo sosa uvek možete da uspete još pavlake, ali onda probajte da vidite da li je sve dovoljno slano. Prokrčkajte još par minuta i to je to. Uz piletinu požete poslužiti testeninu, bilo koju vrstu krompira, izaberite šta vam je najlakše. Meni nekako krompir iz rerne sa dosta začina. Mada nekad kad baš jako žurim brzinski mutim minut pire i prodje ručak, ih, samo da se nešto žvakne :D Prijatno.'
      }
    );

    this.receptiMapper.set(
      5,
      {
        sastojci: [
          '1kg telećih šnicli',
          'So, biber, začini',
          'Nekoliko kašika brašna',
          '3-4 glavice crvenog luka',
          '1 kašikica crvene mljevene paprike',
          '1 kašikica senfa',
          '1 ćešnjak bijelog luka'
        ],
        priprema: 'Šnicle dobro izlupati, pa posoliti i pobiberiti. Soliti sa obe strane, a biber sa jedne i slagati jedne na druge. U dubljem tiganju ili šerpi zagrejati ulje ( onako da ima malo manje nego “s prsta” ) Pržiti šnicle na jačoj vatri sa obe stane po nekoliko minuta, taman da krenu da rumene i odlagati na tanjir. Skloniti ulje sa vatre, pa očistiti i iseći luk na kriškice. Vratiti tiganj na vatru, pa dodati luk i čašu vode. Smanjiti vatru na srednju, pa luk prvo dinstati dok višak vode ne ispari, pa ga onda malo propržiti u ulju od šnicli. Kada je luk omekanio i količina se duplo smanjila od one koju ste prvo stavili dodati kašiku brašna i crvenu papriku pa sve dobro izmešati. Mešati još nekoliko minuta, pa naliti vode. Vode kad nalijete treba da je gustine jogurta, tako ćete proceniti koliko vode treba sipati. Može da bude i nijansu redje jer će se sve to još malo krčkati, pa će se zgusnuti. Zatim dodati senf i začine i sve promešati. Uroniti šnicle u ovaj sos, vatru smanjiti na baš slabu i ostaviti da sve zajedno polako krčka. Za to vreme očistiti krompir i iseći na kockice, za zalogaj ili nijansu krupnije. Nemojte ni presitniti. Staviti da se kuva 5 do 10 minuta, nikako više od 10 od momenta kad voda provri. Optimalno je nekih 7 – 8. Procediti od viška vode, pa zagrejati ulje u nekoj manjoj šerpi. Ulja treba da je onako sa dva prsta. Spustiti krompir i pržiti dok ne porumeni, a ispržen odlagati na ubrus, pa prebaciti u šerpu i posoliti. Ukoliko je više krompira podeliti ga u više tura, ako ga bude previeš u ulju raspadaće se. I bitna stvar kod ovakve pripreme je da kada uronite krompir u vrelo ulje jedno vreme ga uopšta ne dirate, nema čestog mešanja u početku dok se na njemu na obrazuje opna, tj zahrskavis e okolo, e ond amožete slobodno mešati, jer je on kuvan pa mešanjam dolazi do raspadanja. Čim je krompir gotov, gotove su i šnicle. Prijatno!'
      }
    );
  }

}
