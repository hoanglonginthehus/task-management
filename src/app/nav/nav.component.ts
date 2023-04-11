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
    library.addIconPacks(fas);
  }

  logOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('name');
    this.router.navigate(['login']);
  }
}
