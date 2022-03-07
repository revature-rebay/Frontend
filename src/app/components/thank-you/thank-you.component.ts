import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  orderNum:number = 0;

  constructor() {}

  ngOnInit(): void {}

  //Generate a random order number, very basic implementation inteded for expansion
  generateRandomOrderNum(): string {
    if(!this.orderNum){
      this.orderNum = Math.floor(10000000 + Math.random() * 90000000);
    }
    return this.orderNum.toString();
  }
}
