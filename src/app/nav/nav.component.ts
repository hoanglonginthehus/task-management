import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  account = localStorage.getItem('username');

  constructor(private router: Router, private library: FaIconLibrary) {
    this.library.addIconPacks(fas);
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
