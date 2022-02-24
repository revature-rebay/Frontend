import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//used for toggling cart side panel
export class NavigationService {
  
  //showNave is shared between components
  private toggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showNav = this.toggle.asObservable();

  constructor() { }

  ngOnInit() {
  }

  //updates the BehaviorSubject
  toggleShowNav(){
    this.toggle.next(!this.toggle.value);
  }

  // //get current value of BehaviorSubject
  // getCurrentShowNav(){
  //   return this.toggle.getValue();
  // }
}
