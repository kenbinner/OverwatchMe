import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  platforms:string[] = ["Xbox","Playstation"];

  playerForm: FormGroup;
  platform: FormControl;
  playerId: FormControl;

  ngOnInit() {
    this.platform = new FormControl('', Validators.required);
    this.playerId = new FormControl('', Validators.required);

    this.playerForm = new FormGroup({
      platform: this.platform,
      playerId: this.playerId
    });
  }

  

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.playerForm.value);
  }
}
