import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private route: Router) { }
  email: string = '';
  password: string = '';

  login() {
    if (this.email === 'jag@gmail.com' && this.password === 'yolito') {
      alert('Login Succesfully');
      // this.route.navigate(['/rooms', 'add']);
      this.route.navigateByUrl('/rooms/add');
    }
  }
}
