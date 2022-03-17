import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public fb: FormBuilder, public route: Router, public auth: ServiceService) { }

  public loginForm!: FormGroup;
  public response: boolean = false;
  public status: boolean = false;
  public message: string = "";

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [""],
      password: [""]
    })
  }

  signIn () {
    let form = this.loginForm.value;
    this.auth.login(form).subscribe((data: any)=> {
      this.response = true;
      console.log(data);
      if (data.success) {
        this.status = true;
        this.message = data.message;
        localStorage.setItem('token', data.token);
        console.log(data.message + " from server");
      }
    }, (err) => {
      if (err.status == 401) {
        this.status = false;
        this.message = "Login Failed";
      }
    })
  }

}
