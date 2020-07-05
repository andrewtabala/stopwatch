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

  isRainbow: boolean = false

  time_stamp: number = 1000

  seconds: number = 0
  minutes: number = 0
  hours: number = 0

  seconds_str: string = "00"
  minutes_str: string = "00"
  hours_str: string = "00"

  stopwatch



  // dry functions
  reset_variables() {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
  }

  convert_time() {
    this.seconds < 10 ? this.seconds_str = "0"+this.seconds : this.seconds_str = ""+this.seconds
    this.minutes < 10 ? this.minutes_str = "0"+this.minutes : this.minutes_str = ""+this.minutes
    this.hours < 10 ? this.hours_str = "0"+this.hours : this.hours_str = ""+this.hours
  }
  // dry functions end



  //  int main(argc, **argv)      (here the timer ticks every N milliseconds, 'stopwatch' is the timer variable,
  //  this is needed for proper restarting with another interval)

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


        this.convert_time()

      }
    });
  }


  // Start|Stop button handler (resets all the variables, then switches its state)
  toggleTimer() {
    if (this.isRunning) {
      this.reset_variables()
      this.convert_time()
    }
    this.isRunning = !this.isRunning
  }


  // Wait button handler (just changes balue of isrunnign, timer is actually ticking ALL the time)
  // It would be too inefficient to fully stop and start timer every time user clicks Wait
  waitTimer() {
    this.isRunning = !this.isRunning
  }


  // Reset button handler (does everything that start|stop does, but does not actually stop the timer)
  resetTimer() {
    this.reset_variables()
    this.convert_time()
  }


  // Universe breaking power. fully stop the timer, then change the interval value, then restart ngOnInit  which restarts the timer.
  // All second/minute/hour values stay the same
  change_time(time) {
    this.stopwatch.unsubscribe();
    this.time_stamp = time
    this.seconds--;
    this.ngOnInit()
  }


  // rainbow mode button handler, changes the state of isRainbow which is used in the template as a render condition
  rainbow_toggle() {
      this.isRainbow = !this.isRainbow
  }


  // function used im template to generate random color for spans
  apply_color() {
    return {"color" : `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}
  }

}
