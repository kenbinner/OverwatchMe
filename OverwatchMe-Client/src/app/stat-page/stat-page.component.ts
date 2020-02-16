import { Component, OnInit } from '@angular/core';
import { GetStatsService } from './get-stats.service';

@Component({
  selector: 'app-stat-page',
  templateUrl: './stat-page.component.html',
  styleUrls: ['./stat-page.component.css']
})
export class StatPageComponent implements OnInit {

  errorMessage: string;
  platform: string;
  playerId: string;
  playerNum: string;
  constructor(private getStatsService:GetStatsService) { }

  getStats(platform:string, playerId:string, playerNum:string){
    this.errorMessage = null;

    this.getStatsService.getStats(platform,playerId,playerNum).subscribe(
      data => console.log(data),
      error => this.errorMessage = <any>error);

  }

  ngOnInit() {
    this.getStats(this.platform, this.playerId, this.playerNum);
  }

}
