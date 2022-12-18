import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private route: Router, private loginService: LoginService) { }
  email: string = '';
  password: string = '';

  login() {
    if (this.loginService.Login(this.email, this.password)) {
      this.route.navigate(['/rooms']);
    }
  }
}
