import {Component, OnInit} from '@angular/core';
import {isNumber} from "util";
import { CaseComponent } from '../case/case.component.ts';
import Alert = webdriver.Alert;
import {Input, Output} from "@angular/core/src/metadata/directives";

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']

})
export class GrilleComponent implements OnInit {

  @Input() chp : GrilleComponent;
     Champs = new Array<Array<CaseComponent>>();


  constructor() {

  }

  ngOnInit() {

   this.Champs=  this.CreerChampMines(9,9);
  }

  CreerChampMines(numLigne: number, numCol: number): CaseComponent[][]{

    let champMines: Array<Array<CaseComponent>> = new Array<Array<CaseComponent>>();
    //let lignes: CaseComponent[][];
    for (let i =0; i<numLigne; i++){
      let ligne: Array<CaseComponent> = new Array<CaseComponent>();
      //let cases: CaseComponent[];
      for (let j =0; j<numCol; j++){
        let macase: CaseComponent = new CaseComponent();
        macase.isCached = true;
        macase.content = 'empty';
       macase.img = '../assets/covered.png';
        ligne.push(macase);
      }
      champMines.push(ligne);
    }
    //placer les mines
    this.placerMine(champMines, 10);

    //calculer le nombre des mines qui entourent la case séléctionnée
    for(let i=0; i < champMines.length; i++){
      for(let j=0; j<champMines[0].length; j++){
        this.calculateNumber(champMines, i, j);
      }
    }

      return champMines;
  }

  placerMine(ChampMine: CaseComponent[][], nbr: number){
    for(let i=0; i<nbr; i++){
      let row:number = Math.round(Math.random()*(ChampMine.length - 1 ));
      let column:number = Math.round(Math.random()*(ChampMine[0].length - 1));
      let mcase : CaseComponent = this.getCase(ChampMine,row,column);
      mcase.content ='mine';
    }

  }

  getCase(champMine: CaseComponent[][], row :number, column: number):CaseComponent {
    let acase : CaseComponent = new CaseComponent();
    acase = champMine[row][column];
    return acase;
  }

  calculateNumber(ChampMine: CaseComponent[][], row: number, column:number) {
    let thisCase = this.getCase(ChampMine, row, column);

    // On vérifie d'abord qu'on est pas sur une mine
    if(thisCase.content === "mine") {
      return;
    }

    let mineCount:number = 0;

    // Vérifie le contenu de la ligne audessus si ce n'est pas la première
    if(row > 0) {
      // vérifie le contenu de la colonne de gauche si on est pas sur la première
      if(column > 0) {
        // récupère le spot juste au dessus à gauche
        let spot:CaseComponent = this.getCase(ChampMine, row - 1, column - 1);
        if(spot.content === "mine") {
          mineCount++;
        }
      }

      // récupère le spot juste au-dessus
      var spot = this.getCase(ChampMine, row - 1, column);
      if(spot.content === "mine") {
        mineCount++;
      }

      // vérifie le contenu de la colonne de droite si on est pas sur la dernière
      if(column < 8) {
        // récupère le spot juste au-dessus à droite
        var spot = this.getCase(ChampMine, row - 1, column + 1);
        if(spot.content === "mine") {
          mineCount++;
        }
      }
    }

    // vérifie le contenu de la colonne de gauche si on est pas sur la première
    if(column > 0) {
      // récupère le spot juste à gauche
      var spot = this.getCase(ChampMine, row, column - 1);
      if(spot.content === "mine") {
        mineCount++;
      }
    }

    // vérifie le contenu de la colonne de droite si on est pas sur la dernière
    if(column < 8) {
      // récupère le spot juste à droite
      var spot = this.getCase(ChampMine, row, column + 1);
      if(spot.content === "mine") {
        mineCount++;
      }
    }

    // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
    if(row < 8) {
      // vérifie le contenu de la colonne de gauche si on est pas sur la première
      if(column > 0) {
        // récupère le spot juste en-dessous à gauche
        var spot = this.getCase(ChampMine, row + 1, column - 1);
        if(spot.content === "mine") {
          mineCount++;
        }
      }

      // récupère le spot juste en-dessous
      var spot = this.getCase(ChampMine, row + 1, column);
      if(spot.content === "mine") {
        mineCount++;
      }

      // vérifie la colonne à droite si ceci n'est pas la dernière
      if(column < 8) {
        // get the spot below and to the right
        var spot = this.getCase(ChampMine, row + 1, column + 1);
        if(spot.content === "mine") {
          mineCount++;
        }
      }
    }

    if(mineCount > 0) {
      thisCase.content = mineCount.toString();
    }
  }

  decouvrirCase(ChampMine: CaseComponent[][], row: number, column:number): CaseComponent[][] {
    let thisCase = this.getCase(ChampMine, row, column);

    // On vérifie d'abord qu'on est pas sur une mine
    if (thisCase.content === "mine")
      return ChampMine;
    //alert(row+" "+column);
    alert(thisCase.content+" "+thisCase.isCached);
    if (thisCase.isCached && thisCase.content === "empty") {

      // Vérifie le contenu de la ligne audessus si ce n'est pas la première
      if (row > 0) {
        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if (column > 0) {
          // récupère le spot juste au dessus à gauche
          let spot: CaseComponent = this.getCase(ChampMine, row - 1, column - 1);

          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row - 1 , row - 1);
          //this.majIsCached(ChampMine, row - 1, column - 1);


        }

        // récupère le spot juste au-dessus
        var spot = this.getCase(ChampMine, row - 1, column);

        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row - 1 , column);
        alert(spot.content +" "+spot.isCached+" "+spot.img);
        // vérifie le contenu de la colonne de droite si on est pas sur la dernière
        if (column < 8) {
          // récupère le spot juste au-dessus à droite
          var spot = this.getCase(ChampMine, row - 1, column + 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row - 1 , column+1);
        }
      }

      // vérifie le contenu de la colonne de gauche si on est pas sur la première
      if (column > 0) {
        // récupère le spot juste à gauche
        var spot = this.getCase(ChampMine, row, column - 1);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row , column-1);
      }

      // vérifie le contenu de la colonne de droite si on est pas sur la dernière
      if (column < 8) {
        // récupère le spot juste à droite
        var spot = this.getCase(ChampMine, row, column + 1);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row  , column+1);
      }

      // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
      if (row < 8) {
        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if (column > 0) {
          // récupère le spot juste en-dessous à gauche
          var spot = this.getCase(ChampMine, row + 1, column - 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row + 1 , column -1);
        }

        // récupère le spot juste en-dessous
        var spot = this.getCase(ChampMine, row + 1, column);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row + 1 , column);
        // vérifie la colonne à droite si ceci n'est pas la dernière
        if (column < 8) {
          // get the spot below and to the right
          var spot = this.getCase(ChampMine, row + 1, column + 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row + 1 , column+1);
        }
      }


    }
    alert("fin :"+thisCase.content+" "+thisCase.isCached);
    return ChampMine;
  }

  click2(row:number, col:number):CaseComponent[][] {
   return this.decouvrirCase(this.Champs, row, col);
  }

  majImg(ChampMine: CaseComponent[][], r:number , c:number):string{

        let thisCase = this.getCase(ChampMine, r, c);
       /* switch (thisCase.content){
          case 'empty' : thisCase.img = '../assets/empty.png';
                break;
          case ''
        }*/
        if(thisCase.content === 'empty')
          thisCase.img = '../assets/empty.png';

        if(thisCase.content === 'mine')
          thisCase.img = '../assets/mine.png';

        if(thisCase.content === '1')
          thisCase.img = '../assets/number-1.png';

        if(thisCase.content === '2')
          thisCase.img = '../assets/number-2.png';

        if(thisCase.content === '3')
          thisCase.img = '../assets/number-3.png';

      /*  if(this.aze.content === '4')
          this.img = '../assets/number-4.png';

        if(this.aze.content === '5')
          this.img = '../assets/number-5.png';

        if(this.aze.content === '6')
          this.img = '../assets/number-6.png';

        if(this.aze.content === '7')
          this.img = '../assets/number-7.png';

        if(this.aze.content === '8')
          this.img = '../assets/number-8.png';
          */
      return thisCase.img;
      }



}


