import { Component, OnInit, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private navService: NavigationService) { }
  // @Output() toggleNavStateEvent = new EventEmitter<boolean>();
  // showNav !: boolean;

  ngOnInit(): void {
    // console.log("in header component")
    // this.navService.showNav.subscribe(showNav => this.showNav = showNav);
  }

  // toggleSideNav() {
  //   this.navService.toggleShowNav();
  // }
}
