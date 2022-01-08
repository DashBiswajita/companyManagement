import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutService } from './about.service';
export interface About {
  title : string,
  content : string
}
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})

export class CommonComponent implements OnInit {
  about : About;
  constructor(private route : ActivatedRoute,private aboutService : AboutService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => {
        if(param.get("type").toString() === "profile"){
          this.aboutService.getProfile().subscribe(
            (profile) => this.about = profile,
            (err) => console.log(err.message)
          )
        }else if(param.get("type").toString() === "faq"){
          this.aboutService.getFaqs().subscribe(
            (faq) => this.about = faq,
            (err) => console.log(err.message)
          )
        }
      },
      (err) => console.log(err.message),
      () => console.log("completed")
    )
  }
  }


