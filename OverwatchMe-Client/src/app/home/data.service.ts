import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class DataService {

  private dataSource1 = new BehaviorSubject('default data');
  currentData1 = this.dataSource1.asObservable();
  private dataSource2 = new BehaviorSubject('default data');
  currentData2 = this.dataSource2.asObservable();

  constructor() { }

  changeData1(data: string) {
    this.dataSource1.next(data)
  }
  changeData2(data: string) {
    this.dataSource2.next(data)
  }

}