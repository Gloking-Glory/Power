import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public fb: FormBuilder, public auth: ServiceService, public route: Router) { }

  public regForm!: FormGroup;
  public response: boolean = false;
  public status: boolean = false;
  public message: string = "";
  ngOnInit(): void {
    this.regForm = this.fb.group ({
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
    })
  }

  regUser () {
    let form = this.regForm.value;
    this.auth.register(form).subscribe((data: any)=> {
      this.response = true;
      if (data.success) { 
        this.status = true;
        this.message = `${data.message}. Redirecting to Login...`;
        this.regForm = this.fb.group ({
          firstName: [""],
          lastName: [""],
          email: [""],
          password: [""],
        });
        setTimeout(() => {
          this.route.navigate(['/signIn']);
        }, 3000);
      } else {
        this.status = false;
        this.message = data.message;
      }
    }, err => {
      this.message = "Sign Up Failed";
      this.status = false;
    })
  }

}
