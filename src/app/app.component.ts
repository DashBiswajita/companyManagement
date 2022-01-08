import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PnM';
  toggle : boolean = false;
  isLoggedIn : boolean ;
  companyName : string = "Comapany Name"
  constructor(private authService : AuthService){}
  ngOnInit(): void {
      this.authService.user.subscribe((user) => this.isLoggedIn = !!user)
  }
  toggleClick(){
    this.toggle = !this.toggle;
  }
}
