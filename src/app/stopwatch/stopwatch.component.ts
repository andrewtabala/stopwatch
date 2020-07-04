import { Component, OnInit } from '@angular/core';
import { timer } from "rxjs";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit {

  constructor() { }

  isRunning: boolean = true

  time_stamp: number = 1000

  seconds: number = 0
  minutes: number = 0
  hours: number = 0

  seconds_str: string = "00"
  minutes_str: string = "00"
  hours_str: string = "00"

  stopwatch;

  ngOnInit() {
    this.stopwatch = timer(0, this.time_stamp).subscribe(ellapsedCycles => {
      if(this.isRunning) {
        this.seconds++;

        if (this.seconds === 60) {
          this.minutes++;
          this.seconds = 0;
        }
        if (this.minutes === 60) {
          this.hours++;
          this.minutes = 0;
        }


        this.seconds < 10 ? this.seconds_str = "0"+this.seconds : this.seconds_str = ""+this.seconds
        this.minutes < 10 ? this.minutes_str = "0"+this.minutes : this.minutes_str = ""+this.minutes
        this.hours < 10 ? this.hours_str = "0"+this.hours : this.hours_str = ""+this.hours
      }
    });
  }

  toggleTimer() {
    if (this.isRunning) {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.seconds < 10 ? this.seconds_str = "0"+this.seconds : this.seconds_str = ""+this.seconds
      this.minutes < 10 ? this.minutes_str = "0"+this.minutes : this.minutes_str = ""+this.minutes
      this.hours < 10 ? this.hours_str = "0"+this.hours : this.hours_str = ""+this.hours
    }
    this.isRunning = !this.isRunning
  }

  waitTimer() {
    this.isRunning = !this.isRunning
  }

  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.seconds < 10 ? this.seconds_str = "0"+this.seconds : this.seconds_str = ""+this.seconds
    this.minutes < 10 ? this.minutes_str = "0"+this.minutes : this.minutes_str = ""+this.minutes
    this.hours < 10 ? this.hours_str = "0"+this.hours : this.hours_str = ""+this.hours
  }




  half_the_time() {
    this.stopwatch.unsubscribe();
    this.time_stamp = 2000
    this.seconds--;
    this.ngOnInit()
  }

  normal_time() {
    this.stopwatch.unsubscribe();
    this.time_stamp = 1000
    this.seconds--;
    this.ngOnInit()
  }

  twice_the_time() {
    this.stopwatch.unsubscribe();
    this.time_stamp = 500
    this.seconds--;
    this.ngOnInit()
  }

  extra_time() {
    this.stopwatch.unsubscribe();
    this.time_stamp = 100
    this.seconds--;
    this.ngOnInit()
  }

}
