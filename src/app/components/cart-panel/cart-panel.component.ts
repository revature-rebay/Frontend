import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideNavDirection } from 'src/app/models/side-nav-direction';
import { CartService } from 'src/app/services/cart.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.css']
})
export class CartPanelComponent implements OnInit {

  showNav !:boolean;

  @Input() sidenavTemplateRef: any;
  duration: number = 0.5; //css stuff
  //fills up entire inner window
  // navWidth: number = window.innerWidth;
  navWidth: number = 400; //width of the side panel
  direction: SideNavDirection = SideNavDirection.Right; //side panel slides from right
  
  constructor(private navService: NavigationService, private cartService:CartService) {
  }

  //gets the subtotal for the cart
  getSubTotal():number{
    return this.cartService.getSubTotal();
  }

  //another behavior subject that will listen to when showNav changes in navService which will update the showNav in this compoenent resulting in sidepanel display or not display
  ngOnInit(): void {
    this.navService.showNav.subscribe(showNav => this.showNav = showNav);
  }

  //closes the side panel 
  onSidebarClose() {
    this.navService.toggleShowNav();
  }

  //sets the style of the side panel, more css stuf
  getSideNavBarStyle() {
    let navBarStyle: any = {};
    
    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (this.showNav ? 0 : (this.navWidth * -1)) + 'px';
    
     return navBarStyle;
  }
}
