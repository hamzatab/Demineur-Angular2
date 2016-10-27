import { Component, OnInit } from '@angular/core';
import {isNumber} from "util";
import { CaseComponent } from '../case/case.component.ts'
import Alert = webdriver.Alert;

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

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
        macase.isCached = false;
        macase.content = 'empty';
        ligne.push(macase);
      }
      champMines.push(ligne);
    }
    this.placerMine(champMines, 10);
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

}
