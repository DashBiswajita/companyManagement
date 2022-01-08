import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  comapanyName : string = 'Company Name';
  toggle : boolean = false;
  loginForm : any;
  err : {}
  constructor(private fbs : FormBuilder, private authService : AuthService, private router : Router) {  }

  ngOnInit(): void {
      this.loginForm = this.fbs.group({
        userName : ['',[Validators.required,Validators.minLength(5),Validators.email]],
        password : ['',[Validators.required,Validators.minLength(8)]]
      })
  }
  onSubmit() {
    this.authService.logIn(this.loginForm.get("userName").value,this.loginForm.get("password").value).subscribe(
      (res) => this.router.navigate(['/home']),
      (err) => console.error(err)
    )
    
  }
  onSignUp(){
    this.authService.signUp(this.loginForm.get("userName").value,this.loginForm.get("password").value).subscribe(
      () => this.router.navigate(['/home']),
      (err) => console.error(err)
    )
  }
  
}
