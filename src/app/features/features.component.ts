import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../service.model';
import { FeatureService } from './features.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit,OnChanges {
  services : Service[];
  service : Service = {type : '', id : 0, dosndonts : ''};
  constructor(private route : ActivatedRoute, private featureService : FeatureService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (param) => {
        this.service.type = param.get("type").toString();
        this.featureService.getFeature(this.service.type).subscribe(
          (service) => {this.service = service},
          (err) => console.log(err.message),
          () => console.log("completed")
        )
      },
      (err) => console.log(err.message),
      () => console.log("completed")
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

}
