import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private data: DataService) { }
  platforms:string[] = ["Xbox","Playstation","PC"];

  playerForm: FormGroup;
  platform: FormControl;
  playerId: FormControl;

  data1:string;
  data2:string;

  ngOnInit() {
    this.platform = new FormControl('', Validators.required);
    this.playerId = new FormControl('', Validators.required);

    this.playerForm = new FormGroup({
      platform: this.platform,
      playerId: this.playerId
    });
    this.data.currentData1.subscribe(data1 => this.data1 = data1);
    this.data.currentData2.subscribe(data2 => this.data2 = data2);
  }


  onSubmit() {
    console.warn(this.playerForm.value);
    this.data.changeData1(this.platform.value);
    this.data.changeData2(this.playerId.value);
    this.router.navigate(['/stats']);
  }
}
