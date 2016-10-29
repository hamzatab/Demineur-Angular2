import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import { GrilleComponent } from '../grille/grille.component.ts'


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],

})
export class CaseComponent implements OnInit {

  @Input() aze : CaseComponent;


  isCached : boolean;
  img : string;
  content: string;

  constructor() {

  }

  ngOnInit() {

    this.img ='../assets/covered.png';

  }

  monclick(){


   // alert(" aze :"+this.aze.isCached+this.aze.content+this.aze.img);
    //let magrille:GrilleComponent = new GrilleComponent();
    //magrille.Champs = this.refgrille.Champs;
    //alert(magrille);
    //this.decouvrirCase(this.refgrille.Champs, row, col);
    //this.isCached = false;

    if(this.aze.content === 'empty'){

      this.aze.img = '../assets/empty.png';
      this.img = '../assets/empty.png';
     // this.aze.img = '../assets/empty.png';
     // this.content = this.aze.content;
     // this.isCached = this.aze.isCached;
    }


    if(this.aze.content === 'mine'){

      this.aze.img = '../assets/mine.png';
      this.img = '../assets/mine.png';
    }


    if(this.aze.content === '1'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-1.png';
      this.img = '../assets/number-1.png';
    }

    if(this.aze.content === '2'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-2.png';
      this.img = '../assets/number-2.png';
    }

    if(this.aze.content === '3'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-3.png';
      this.img = '../assets/number-3.png';
    }

    if(this.aze.content === '4'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-4.png';
      this.img = '../assets/number-4.png';
    }

    if(this.aze.content === '5'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-5.png';
      this.img = '../assets/number-5.png';
    }

    if(this.aze.content === '6'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-6.png';
      this.img = '../assets/number-6.png';
    }

    if(this.aze.content === '7'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-7.png';
      this.img = '../assets/number-7.png';
    }

    if(this.aze.content === '8'){
      this.aze.isCached=false;
      this.aze.img = '../assets/number-8.png';
      this.img = '../assets/number-8.png';
    }
   // alert(this.isCached+" "+this.aze.content);

  //  alert("nrml : " +this.isCached+this.content+this.img+"     aze :"+this.aze.isCached+this.aze.content+this.aze.img);
  }




}
