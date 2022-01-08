import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { About } from './common.component';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http : HttpClient) { }

   getProfile(){
    return this.http.get<About>("../../assets/profile.json");
   }
   getFaqs(){
    return this.http.get<About>("../../assets/faqs.json");
  }
}
