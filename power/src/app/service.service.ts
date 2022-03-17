import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { LoginInterface, UserInterface } from './interface/powerInterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public http: HttpClient, public route: Router) { }

  public baseUrl = environment.baseUrl;

  // register user
  register (form: UserInterface) {
    return this.http.post(`${this.baseUrl}/register`, form);
  }

  // login user
  login (loginForm: LoginInterface) {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  }

  // logout user
  logOut () {
    localStorage.removeItem('token');
    this.route.navigate(['/signIn']);
  }

}
