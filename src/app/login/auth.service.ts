import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, ObservableInput } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user-model';

interface AuthResponse {
  kind : string,
  idToken : string,
  email : string,
  refreshToken : string,
  expiresIn : string,
  localId : string,
  registered?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  constructor(private http : HttpClient,private router : Router) { }
  signUp(email: string, password : string){
  return   this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkd8JL2me1-xjCWH6qQZPVgBfIl2y9iyU",{
       email : email,
       password : password,
       returnSecureToken : true
     })
  }
  logIn(email : string, password : string){
    return   this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkd8JL2me1-xjCWH6qQZPVgBfIl2y9iyU",{
       email : email,
       password : password,
       returnSecureToken : true
     }).pipe(
       tap((res) => this.handleAuth(res.email,+res.expiresIn,res.idToken,res.localId))
     )
  }
  private handleAuth(email : string, expiresIn : number, idToken : string , localId : string){
     let expirationDate = new Date(new Date().getTime() + expiresIn*1000);
     let user = new User(email,localId,idToken,expirationDate);
     this.user.next(user);
     this.autoLogOut(expiresIn * 1000);
     localStorage.setItem('user',JSON.stringify(user));
  } 
  private autoLogOut(expiresIn : number){
    setTimeout(()=>{
      this.logOut()
    },expiresIn)
  }
  logOut(){
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/logIn']);
  }
}
