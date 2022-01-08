import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { exhaust, exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "./login/auth.service";

@Injectable({providedIn : "root"})
export class AppInterceptor implements HttpInterceptor{
     constructor(private authService : AuthService, private route : ActivatedRoute){}
     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return this.authService.user.pipe(
            (take(1)),
            exhaustMap(user => {
                if(!user) {
                    return next.handle(req);
                }else {
                    let headers = new HttpHeaders({
                        "Content-Type" : "application/json",
                        "Authorization" : user.token
                    });
                    let reqClone = req.clone({
                        headers : headers,
                        params : new HttpParams().append('auth',user.token)
                    });
                    return next.handle(reqClone)
                }
            })
        )
       
     }
}