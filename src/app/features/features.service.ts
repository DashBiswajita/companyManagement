import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Service } from "../service.model";
import {filter, map} from "rxjs/operators"
import { Observable } from "rxjs";
@Injectable(
    {
        providedIn : "root",
    }
)
export class FeatureService {
  constructor(private http : HttpClient){
  
  }
  getFeature(type) : Observable<Service>{
   return this.http.get<Service[]>("../assets/services.json").pipe(
        map((services) => services.find((service) => service.type.toLowerCase() === type.toLowerCase()))
    )
  }
  getAllFeatures() : Observable<Service[]>{
    return this.http.get<Service[]>("../assets/services.json")
   }
}