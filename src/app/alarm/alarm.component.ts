import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss']
})
export class AlarmComponent implements OnInit {
 
  alarms: { time: string; active: boolean }[] = [];
  alarmTime: string = '';
  audio = new Audio('../../assets/stylish-chill-303261.mp3'); 
  snoozeTime=4*60*1000;
  isAlarmActive = false;


  // @ViewChild('alarmAudio') alarmAudio: ElementRef;

  constructor() {}

  ngOnInit() {
    setInterval(() => this.checkAlarms(), 1000);
  }

  addAlarm() {
    if (this.alarmTime) {
      this.alarms.push({ time: this.alarmTime, active: true });
      this.alarmTime = '';
    }
  }

  deleteAlarm(index: number) {
    this.alarms.splice(index, 1);
    this.audio.pause();
  }

  checkAlarms() {
    const currentTime = new Date();
    const formattedTime = currentTime.toTimeString().slice(0, 5); 

    this.alarms.forEach((alarm, index) => {
      if (alarm.active && alarm.time === formattedTime) {
        this.triggerAlarm(index);
      }
    });
  }

  triggerAlarm(index: number) {
    this.isAlarmActive = true;
    this.audio.play();
 
  }

  snoozeAlarm(index: number) {
    this.audio.pause();


    this.audio.currentTime = 0;

    
    let snoozeTime = new Date();
    snoozeTime.setSeconds(snoozeTime.getSeconds() + 20);
  
    this.alarms[index].time = snoozeTime.toTimeString().slice(0, 10);
    this.alarms[index].active = true;
 


   
  }

}
