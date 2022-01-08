import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'app-raise-ticket',
  templateUrl: './raise-ticket.component.html',
  styleUrls: ['./raise-ticket.component.scss']
})
export class RaiseTicketComponent implements OnInit {
  ticketRaiseForm : any;
  errors : {};
  constructor(private fbs : FormBuilder, private http : HttpClient, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.ticketRaiseForm = this.fbs.group({
      name : ['', [Validators.required,Validators.maxLength(255)]],
      contact : ['',[Validators.required,Validators.maxLength(13),Validators.minLength(10)]],
      emailId : ['', [Validators.email,Validators.required]],
      issueDesc : ['', [Validators.required]],
      addnlDet : '',
      image : ''
    });
    this.http.get("../../assets/errors.json").subscribe((err) => this.errors = err);
  }
  get name(){
    return this.ticketRaiseForm.controls.name;
  }
  get contact(){
    return this.ticketRaiseForm.controls.contact;
  }
  get emailId(){
    return this.ticketRaiseForm.controls.emailId;
  }
  get issueDesc(){
    return this.ticketRaiseForm.controls.issueDesc;
  }
  get addnlDet(){
    return this.ticketRaiseForm.controls.addnlDet;
  }
  get image(){
    return this.ticketRaiseForm.controls.image;
  }
  
  ticketSubmit(){
    this.http.post("https://pandm-6eca1-default-rtdb.firebaseio.com/tickets.json",this.ticketRaiseForm.value).subscribe(
      (res) => {alert("Ticket submitted succefully !!!"); this.ticketRaiseForm.reset();},
      (err) => console.log(err)
    ) 
  }
  onCancel(){
     if(confirm("Unsaved Data will be lost. Do you want to proceed ?")){
        this.router.navigate(['../contact'],{relativeTo : this.route})
     }
  }
}
