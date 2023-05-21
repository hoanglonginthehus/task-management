import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private library: FaIconLibrary) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    library.addIconPacks(fas);
  }

  login() {
    const val = this.form.value;
    this.authService.login(val.username, val.password).subscribe(
      response => {
        const token = localStorage.getItem(this.authService.TOKEN_NAME);
        if (val.username && val.password && (token != 'null'))
          this.router.navigate(['dashboard']);
      },
      error => {
        console.log(error);
        alert('Dang nhap that bai');
      }
    );
  }


}
