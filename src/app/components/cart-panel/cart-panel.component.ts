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
  duration: number = 0.5;
  //fills up entire inner window
  // navWidth: number = window.innerWidth;
  navWidth: number = 400;
  direction: SideNavDirection = SideNavDirection.Right;
  
  constructor(private navService: NavigationService, private cartService:CartService) {
  }

  getSubTotal():number{
    return this.cartService.getSubTotal();
  }

  ngOnInit(): void {
    this.navService.showNav.subscribe(showNav => this.showNav = showNav);
  }

  onSidebarClose() {
    this.navService.toggleShowNav();
  }

  getSideNavBarStyle() {
    let navBarStyle: any = {};
    
    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (this.showNav ? 0 : (this.navWidth * -1)) + 'px';
    
     return navBarStyle;
  }
}
