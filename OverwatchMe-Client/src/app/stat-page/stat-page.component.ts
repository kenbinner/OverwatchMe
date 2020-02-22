import { Component, OnInit } from '@angular/core';
import { GetStatsService } from './get-stats.service';
import { DataService } from '../home/data.service';

@Component({
  selector: 'app-stat-page',
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.css']
})
export class StatPageComponent implements OnInit {

  data1:string;
  data2:string;

  view:string = "Casual";
  errorMessage: string;
  errorFound: boolean = false;
  pc: boolean = false;
  loading: boolean = true;
  platform: string;
  playerId: string;
  profileData: any;
  constructor(private getStatsService:GetStatsService, private data:DataService) { }

  getStats(platform:string, playerId:string){
    this.errorMessage = null;

    this.getStatsService.getStats(platform,playerId).subscribe(
      (stats) => {
        console.log(stats);
        this.profileData = stats;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorFound = true;
        this.errorMessage = <any>error
      }
      );
  }

  ngOnInit() {
    this.data.currentData1.subscribe(data1 => this.data1 = data1);
    this.data.currentData2.subscribe(data2 => this.data2 = data2);

    this.platform = this.data1;
    this.playerId = this.data2;

    if(this.platform == "Xbox"){
      this.platform = "xbl";
    }else if(this.platform == "Playstation"){
      this.platform = "psn";
    }

    for(let i = 0; i < this.playerId.length; i++){
      if(this.playerId.charAt(i)=='#'){
        var splitArr = this.playerId.split("#", 2);
        this.playerId = splitArr[0] + "-" + splitArr[1];
        console.log(this.playerId);
        this.pc = true;
      }
    }

    this.getStats(this.platform, this.playerId);
  }

}
