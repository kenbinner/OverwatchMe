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

  errorMessage: string;
  pc: boolean = false;
  loading: boolean = true;
  platform: string;
  playerId: string;
  playerNum: string;
  constructor(private getStatsService:GetStatsService, private data:DataService) { }

  getStats(platform:string, playerId:string, playerNum:string){
    this.errorMessage = null;

    this.getStatsService.getStats(platform,playerId,playerNum).subscribe(
      (stats) => {
        console.log(stats);
        this.loading = false;
      },
      (error) => {
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
        var splitArr = this.playerId.split("#", 1);
        splitArr[0] = this.playerId;
        splitArr[1] = this.playerNum;
        this.pc = true;
      }
    }
    if(!this.pc){
      this.playerNum = "0";
    }

    this.getStats(this.platform, this.playerId, this.playerNum);
  }

}
