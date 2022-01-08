import { HttpClient } from '@angular/common/http';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
   contact : any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get("../../assets/contacts.json").subscribe(
      (contacts) => this.contact = contacts,
      (err) => console.log(err.message)
    )
  }

}
