import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLogged: boolean = false;
  isAdmin: boolean = false;

  constructor() { }

  Login(email: string, password: string) {
    if (email === 'admin@gmail.com' && password === 'admin') {
      alert('Login Succesfully');
      // this.route.navigate(['/rooms', 'add']);
      this.isLogged = true;
      this.isAdmin = true;
    }
    if (email === 'user@gmail.com' && password === 'user') {
      this.isLogged = true;
      this.isAdmin = false;
    }
    return this.isLogged;
  }
}
