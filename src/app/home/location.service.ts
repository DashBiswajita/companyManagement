import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,pipe } from "rxjs";
import { City } from "../city.model";
import { LocationValue } from "../location.model";
@Injectable(
    {
        providedIn : "root"
    }
)

export class LocationService {
   constructor(private http : HttpClient){}

   getLocations() : Observable<LocationValue[]>{
      return this.http.get<LocationValue[]>("../../assets/locations.json")
   }
}