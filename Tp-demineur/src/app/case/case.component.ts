import { Component, OnInit } from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  @Input() aze : CaseComponent;

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
   // alert(this.isCached+" "+this.aze.content);
  }
}
