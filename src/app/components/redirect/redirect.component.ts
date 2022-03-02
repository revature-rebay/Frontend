import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    //I was having trouble getting the search button (which is located inside of
    //the navbar component) getting to reload the search page when the button
    //was clicked while already on the search page. Clicking the search button
    //now loads of this 'redirect' component first which currently only serves 
    //to redirect to the 'searc_results' page
    this.router.navigateByUrl("search_results");
  }

}
