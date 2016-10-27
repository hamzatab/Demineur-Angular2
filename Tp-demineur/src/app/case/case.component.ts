import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import { GrilleComponent } from '../grille/grille.component.ts'


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  @Input() aze : CaseComponent;
  @Input() refgrille : GrilleComponent;
  isCached : boolean;
  img : string;
  content: String;

  constructor() {

    this.isCached = true;
    this.img = '../assets/covered.png';

  }

  ngOnInit() {
  }

  monclick(){
    //alert(this.isCached+" "+this.content);
    this.isCached = false;
    if(this.aze.content === 'empty')
    this.img = '../assets/empty.png';

    if(this.aze.content === 'mine')
      this.img = '../assets/mine.png';

    if(this.aze.content === '1')
      this.img = '../assets/number-1.png';

    if(this.aze.content === '2')
      this.img = '../assets/number-2.png';

    if(this.aze.content === '3')
      this.img = '../assets/number-3.png';

    if(this.aze.content === '4')
      this.img = '../assets/number-4.png';

    if(this.aze.content === '5')
      this.img = '../assets/number-5.png';

    if(this.aze.content === '6')
      this.img = '../assets/number-6.png';

    if(this.aze.content === '7')
      this.img = '../assets/number-7.png';

    if(this.aze.content === '8')
      this.img = '../assets/number-8.png';
   // alert(this.isCached+" "+this.aze.content);
  }


/*
  decouvrirCase(ChampMine: CaseComponent[][], row: number, column:number) {
    let thisCase = this.refgrille.getCase(ChampMine, row, column);

    // On vérifie d'abord qu'on est pas sur une mine
    if (thisCase.content === "mine")
      return;
    if (thisCase.isCached && thisCase.content == "empty") {

      let mineCount: number = 0;

      // Vérifie le contenu de la ligne audessus si ce n'est pas la première
      if (row > 0) {
        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if (column > 0) {
          // récupère le spot juste au dessus à gauche
          let spot: CaseComponent = this.refgrille.getCase(ChampMine, row - 1, column - 1);
          if (spot.content === "mine") {
            return;
          }
          spot.isCached = false;
        }

        // récupère le spot juste au-dessus
        var spot = this.refgrille.getCase(ChampMine, row - 1, column);
        if (spot.content === "mine") {
          mineCount++;
        }

        // vérifie le contenu de la colonne de droite si on est pas sur la dernière
        if (column < 8) {
          // récupère le spot juste au-dessus à droite
          var spot = this.getCase(ChampMine, row - 1, column + 1);
          if (spot.content === "mine") {
            mineCount++;
          }
        }
      }

      // vérifie le contenu de la colonne de gauche si on est pas sur la première
      if (column > 0) {
        // récupère le spot juste à gauche
        var spot = this.getCase(ChampMine, row, column - 1);
        if (spot.content === "mine") {
          mineCount++;
        }
      }

      // vérifie le contenu de la colonne de droite si on est pas sur la dernière
      if (column < 8) {
        // récupère le spot juste à droite
        var spot = this.getCase(ChampMine, row, column + 1);
        if (spot.content === "mine") {
          mineCount++;
        }
      }

      // Vérifie le contenu  de la ligne en dessous si on est pas sur a dernière
      if (row < 8) {
        // vérifie le contenu de la colonne de gauche si on est pas sur la première
        if (column > 0) {
          // récupère le spot juste en-dessous à gauche
          var spot = this.getCase(ChampMine, row + 1, column - 1);
          if (spot.content === "mine") {
            mineCount++;
          }
        }

        // récupère le spot juste en-dessous
        var spot = this.getCase(ChampMine, row + 1, column);
        if (spot.content === "mine") {
          mineCount++;
        }

        // vérifie la colonne à droite si ceci n'est pas la dernière
        if (column < 8) {
          // get the spot below and to the right
          var spot = this.getCase(ChampMine, row + 1, column + 1);
          if (spot.content === "mine") {
            mineCount++;
          }
        }
      }

      if (mineCount > 0) {
        thisCase.content = mineCount.toString();
      }
    }
  }*/
}
