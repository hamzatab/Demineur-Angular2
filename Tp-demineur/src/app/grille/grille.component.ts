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
  nbMine:number;
  nombreLignes:number =9;
  nombreColonnes:number=9;
  constructor() {

  }

  ngOnInit() {
    this.nbMine = 10;
   this.Champs=  this.CreerChampMines(this.nombreLignes,this.nombreColonnes);
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
    this.placerMine(champMines, this.nbMine);

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
      if(column < this.nombreColonnes  - 1) {
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
    if(column < this.nombreColonnes - 1) {
      // récupère le spot juste à droite
      var spot = this.getCase(ChampMine, row, column + 1);
      if(spot.content === "mine") {
        mineCount++;
      }
    }

    // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
    if(row < this.nombreLignes - 1 ) {
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
      if(column < this.nombreColonnes - 1) {
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
  decouvrirCase2(ChampMine: CaseComponent[][], row: number, column:number): CaseComponent[][] {

    let thisCase = this.getCase(ChampMine, row, column);
    if(thisCase.isCached && thisCase.img != '../assets/flag-mine.png'){
      if(thisCase.content === "empty"){

        thisCase.isCached = false;
        thisCase.img = this.majImg(thisCase.content);
        // Vérifie le contenu de la ligne audessus si ce n'est pas la première
        if(row > 0) {
          // vérifie le contenu de la colonne de gauche si on est pas sur la première
          if(column > 0) {
            // récupère le spot juste au dessus à gauche
            ChampMine = this.decouvrirCase2(ChampMine, row - 1, column - 1);

          }

          // récupère le spot juste au-dessus
          ChampMine = this.decouvrirCase2(ChampMine, row - 1, column);


          // vérifie le contenu de la colonne de droite si on est pas sur la dernière
          if(column < this.nombreLignes - 1) {
            // récupère le spot juste au-dessus à droite
            ChampMine = this.decouvrirCase2(ChampMine, row - 1, column + 1);

          }
        }

        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if(column > 0) {
          // récupère le spot juste à gauche
          ChampMine = this.decouvrirCase2(ChampMine, row, column - 1);

        }

        // vérifie le contenu de la colonne de droite si on est pas sur la dernière
        if(column < this.nombreColonnes - 1) {
          // récupère le spot juste à droite
          ChampMine = this.decouvrirCase2(ChampMine, row, column + 1);

        }

        // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
        if(row < this.nombreLignes - 1) {
          // vérifie le contenu de la colonne de gauche si on est pas sur la première
          if(column > 0) {
            // récupère le spot juste en-dessous à gauche
            ChampMine = this.decouvrirCase2(ChampMine, row + 1, column - 1);

          }

          // récupère le spot juste en-dessous
          ChampMine = this.decouvrirCase2(ChampMine, row + 1, column);


          // vérifie la colonne à droite si ceci n'est pas la dernière
          if(column < this.nombreColonnes - 1) {
            // get the spot below and to the right
            ChampMine = this.decouvrirCase2(ChampMine, row + 1, column + 1);

          }
        }
      }
      else if (thisCase.content === "mine"){
        this.estPerdu();
        thisCase.img = '../assets/mine-wrong.png';
      }
      else{
        thisCase.img = this.majImg(thisCase.content);
      }
    }
    return ChampMine;
  }
  /*
  decouvrirCase(ChampMine: CaseComponent[][], row: number, column:number): CaseComponent[][] {
    let thisCase = this.getCase(ChampMine, row, column);

    // On vérifie d'abord qu'on est pas sur une mine
  //  if (thisCase.content === "mine")
   //   return ChampMine;
    //alert(row+" "+column);
   // alert(thisCase.content+" "+thisCase.isCached);
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
           ChampMine = this.decouvrirCase(ChampMine, row - 1, column - 1);

        }

        // récupère le spot juste au-dessus
        var spot = this.getCase(ChampMine, row - 1, column);

        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row - 1 , column);
        ChampMine = this.decouvrirCase(ChampMine, row - 1, column);
        //alert(spot.content +" "+spot.isCached+" "+spot.img);
        // vérifie le contenu de la colonne de droite si on est pas sur la dernière
        if (column < 8) {
          // récupère le spot juste au-dessus à droite
          var spot = this.getCase(ChampMine, row - 1, column + 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row - 1 , column+1);
          ChampMine = this.decouvrirCase(ChampMine, row - 1, column + 1);
        }
      }

      // vérifie le contenu de la colonne de gauche si on est pas sur la première
      if (column > 0) {
        // récupère le spot juste à gauche
        var spot = this.getCase(ChampMine, row, column - 1);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row , column-1);
        ChampMine =  this.decouvrirCase(ChampMine, row, column - 1);
      }

      // vérifie le contenu de la colonne de droite si on est pas sur la dernière
      if (column < 8) {
        // récupère le spot juste à droite
        var spot = this.getCase(ChampMine, row, column + 1);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row  , column+1);
        ChampMine =  this.decouvrirCase(ChampMine, row , column + 1);
      }

      // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
      if (row < 8) {
        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if (column > 0) {
          // récupère le spot juste en-dessous à gauche
          var spot = this.getCase(ChampMine, row + 1, column - 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row + 1 , column -1);
          ChampMine =  this.decouvrirCase(ChampMine, row + 1, column - 1);
        }

        // récupère le spot juste en-dessous
        var spot = this.getCase(ChampMine, row + 1, column);
        spot.isCached = false;
        spot.img = this.majImg(ChampMine, row + 1 , column);
        ChampMine =  this.decouvrirCase(ChampMine, row + 1, column );
        // vérifie la colonne à droite si ceci n'est pas la dernière
        if (column < 8) {
          // get the spot below and to the right
          var spot = this.getCase(ChampMine, row + 1, column + 1);
          spot.isCached = false;
          spot.img = this.majImg(ChampMine, row + 1 , column+1);
          ChampMine =  this.decouvrirCase(ChampMine, row + 1, column + 1);
        }
      }


    }
   // alert("fin :"+thisCase.content+" "+thisCase.isCached);
    return ChampMine;
  }
*/

  click2(row:number, col:number):CaseComponent[][] {
   return this.decouvrirCase2(this.Champs, row, col);
  }

// pour vérifier si le jouer a gagné ou pas !
  verif(){
    if(this.estGagne(this.nbMine)) {
      alert("VOUS AVEZ GAGNE!!!");
    }
  }

  majImg(cont: string):string{

    if(cont === 'empty')
      return '../assets/empty.png';

    if(cont === 'mine')
      return '../assets/mine.png';

    if(cont === '1')
      return '../assets/number-1.png';
    if(cont === '2')
      return '../assets/number-2.png';

    if(cont === '2')
      return '../assets/number-2.png';
    if(cont === '3')
      return '../assets/number-3.png';
    if(cont === '4')
      return '../assets/number-4.png';
    if(cont === '5')
      return '../assets/number-5.png';
    if(cont === '6')
      return '../assets/number-6.png';
    if(cont === '7')
      return '../assets/number-7.png';
    if(cont === '8')
      return '../assets/number-8.png';


      }

  estGagne( nbMine:number):boolean{
    let nbrCellWithoutMine = (this.Champs.length * this.Champs[0].length) - nbMine;
    let nbr:number =0;
    for(let i=0; i < this.Champs.length; i++){
      for(let j=0; j<this.Champs[0].length; j++){
        if(this.Champs[i][j].isCached === false && this.Champs[i][j].content != 'mine'){
          nbr++;
        }
      }
    }

    if (nbr === nbrCellWithoutMine){
      return true;
    }
    else return false;
  }

  estPerdu(){
    for(let i=0; i < this.Champs.length; i++){
      for(let j=0; j<this.Champs[0].length; j++){
        if(this.Champs[i][j].isCached === true && this.Champs[i][j].content === 'mine'){
          this.Champs[i][j].img = '../assets/mine.png';
        }
      }
    }
    alert("VOUS AVEZ PERDU :( :( !!!");
  }

  NouvellePartie(){
    this.Champs=  this.CreerChampMines(this.nombreLignes,this.nombreColonnes);
  }
}


