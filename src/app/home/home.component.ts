import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { City } from '../city.model';
import { FeatureService } from '../features/features.service';
import { LocationValue } from '../location.model';
import { Service } from '../service.model';
import { LocationService } from './location.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  qouteSubmitForm : any;
  locations : LocationValue[];
  services : Service[];
  cities : City[];
  errors : {};
  movingToCities : City[];
  constructor(private http : HttpClient,private fbs : FormBuilder,private locationService : LocationService,private featureService : FeatureService) { }
  
  ngOnInit(): void {
    this.qouteSubmitForm = this.fbs.group({
      location : ['',[Validators.required]],
      serviceType : [{value : '', disabled : true},[Validators.required]],
      movingFrom : [{value : '', disabled : true}, [Validators.required]],
      movingTo : [{value : '', disabled : true}, [Validators.required]],
      movingOn : ['', [Validators.required]],
      name : ['', [Validators.required]],
      mobile : ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      emailId : ['', [Validators.email]]
    })
    this.locationService.getLocations().subscribe(
      (locations) => this.locations = locations,
      (err) => console.log(err.message)
    )
    this.featureService.getAllFeatures().subscribe(
      (ser) => this.services = ser,
      (err) => console.log(err.message)
    )
    this.qouteSubmitForm.controls["location"].valueChanges.subscribe(
      (loc) => {
        if(!!loc){
          this.qouteSubmitForm.controls["serviceType"].enable();
          this.qouteSubmitForm.controls["movingFrom"].enable();
          let loction = this.locations.find((locf) => locf.id === +loc);
          this.cities = loction.city;
        }else {
          this.qouteSubmitForm.controls["serviceType"].disable(true);
          this.qouteSubmitForm.controls["movingFrom"].disable(true);
        }
      },
      (err) => console.log(err.message)
    )
    this.qouteSubmitForm.controls["serviceType"].valueChanges.subscribe(
       (ser) => {
          let service = this.services.find((serv) => serv.id === ser);
          this.movingToCities = [];
          if(!!service){
            this.qouteSubmitForm.controls["movingTo"].enable();
            if( !!service && service.type.toLowerCase() === "international"){
              this.locations.forEach((loc) => {
                if(!!loc && loc.id !== +this.qouteSubmitForm.controls["location"].value){
                  this.movingToCities = !!this.movingToCities ? [...this.movingToCities,...loc.city] : [...loc.city];
                }
              })
          }else if (!!service && !(service.type.toLowerCase() === "international")){
              this.movingToCities = this.cities;
          }
          }else {
            this.qouteSubmitForm.controls["movingTo"].disable(true);
          }
       },
       (err) => console.log(err.message)
    )
    this.http.get("../../assets/errors.json").subscribe((err) => this.errors = err);
  }
  get location(){
    return this.qouteSubmitForm.controls.location;
  }
  get serviceType(){
    return this.qouteSubmitForm.controls.serviceType;
  }
  get movingFrom(){
    return this.qouteSubmitForm.controls.movingFrom;
  }
  get movingTo(){
    return this.qouteSubmitForm.controls.movingTo;
  }
  get movingOn(){
    return this.qouteSubmitForm.controls.movingOn;
  }
  get name(){
    return this.qouteSubmitForm.controls.name;
  }
  get mobile(){
    return this.qouteSubmitForm.controls.name;
  }
  get emailId(){
    return this.qouteSubmitForm.controls.emailId;
  }
  quoteSubmit(){
    this.http.post("https://pandm-6eca1-default-rtdb.firebaseio.com/quotes.json",this.qouteSubmitForm.value).subscribe(
      (res) => {alert("Quote submitted succefully !!!"); this.qouteSubmitForm.reset();},
      (err) => console.log(err)
    ) 
  }
}
