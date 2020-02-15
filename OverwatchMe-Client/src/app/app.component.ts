import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { platform } from 'os';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OverwatchMe-Client';
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
