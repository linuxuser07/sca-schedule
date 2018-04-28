import { Component, OnInit } from '@angular/core';
import {Facility} from '../facility';
import {CompanyService} from '../company.service';
import {Schedule} from '../schedule';
import { shallowEqual } from '@angular/router/src/utils/collection';
import { WeekDay } from '@angular/common';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})



export class ScheduleComponent implements OnInit {
  // arrays to keep track of schedules and facilities
  facilities: Facility[];
  schedules: Schedule[];
  //for the selected facility
  selectedFacility;
  //to keep track of which tables to show and hidde
  //schedules table
  showTable: Boolean;
  // days needing more anesthisians
  showTable2: Boolean;
  // date variable for the date picker
  myDate = new Date();
  // to get the days that will display on the table
  dayOfWeek = {month: 0, day: 0};
  weekDays = [];
  // to get a count of the missed days
  missedDay = {Day: '', amount: 0};
  missingDays = [];
  // to keetp track of each day of the week
  monday = 0;
  tuesday = 0;
  wednesday  = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    // making the tables hidden
    this.showTable = true;
    this.showTable2 = true;
    // getting the facilities.
    this.getFacilities();

  }
  // getting the Facilities from the api
  getFacilities() {
  this.companyService.getFacilities().subscribe(r => {this.facilities = r.data},
    err => console.log(err),
    () => console.log('Done Getting the Facilities'));
  }

  // getting the Schedules from the Api
  // also gettings the dates for the table

  getSchedule() {
    // hides the days table
    this.showTable2 = true;
    // resetting the weekDays and missingDates to show proper dates and days where anesthesians are needed.
    this.weekDays =[];
    this.missingDays = [];
    //checks to make sure that there is values selected so it doesn't do a empty call and checkint to see if its a monday selected.
    if(this.selectedFacility !== '' && this.myDate.getDay() === 1){
      // also gettings the dates for the table
      this.getDatesOfWeek(this.myDate);
      //clears the days count to make sure that its not adding extra to it.
      this.cleardays();
    this.showTable = false;
      this.companyService.getSchedule(this.selectedFacility, this.myDate.getDate().toString()).subscribe(r => {this.schedules = r.data},
      err => console.log(err),
    () => console.log("Finished getting schedules"));
    }
  }

  //sets the days only available to select to monday for the Mat-datepicker.
  onlyMonday(myDate){
    var day = myDate.getDay();
      return day === 1;
  }
  //going through each day to find if there is more than one person working.
  // and adding it to the missingDays.
  dayOff(){
    var schedule = this.schedules;
    console.log("Inside dayOff", schedule);
    let dot = [0,0,0,0,0,0];
    let dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if(schedule !== undefined){

    for ( let i = 0; i < schedule.length; i++) {
      if (schedule[i].teammateType !== 'Anesthesia') { continue;}
      if (schedule[i].monday !== 'OFF') {
          dot[0]++;
      } if (schedule[i].tuesday !== 'OFF') {
          dot[1]++;
      } if (schedule[i].wednesday !== 'OFF') {
          dot[2]++;
      } if (schedule[i].thursday !== 'OFF') {
          dot[3]++;
      } if (schedule[i].friday !== 'OFF') {
          dot[4]++;
      } if (schedule[i].saturday !== 'OFF') {
          dot[5]++;
      }
    }
    for (let i = 0; i < dot.length; i++) {
      if (dot[i] < 2) {
        this.missedDay.Day = dayNames[i];
        this.missedDay.amount = dot[i];
        this.missingDays.push(this.missedDay);
        this.missedDay = {Day: '', amount: 0};
        console.log(this.missingDays, 'these are the missing days');
      }
    }
    }
  }
  // calls the days off function.
  getMissingDays(){
    if(this.schedules !== undefined){
    this.dayOff();
    this.showTable2= false;
    }
  }
  // clears the days to make sure that there is not duplicates.
  cleardays(){
    this.monday =0;
    this.tuesday =0;
    this.wednesday =0;
    this.thursday =0;
    this.friday = 0;
    this.saturday =0;
  }

  // getting the string of each day. pasing it to an array so it can be parsed.
  getDatesOfWeek(day: Date){
    let result = new Date(day);
    let month = result.getMonth() + 1;
    let days = result.getDate();
    let mad = month + '/' + days;
    this.weekDays.push(mad);

    for(let i = 0; i < 6; i++) {

      result.setDate(result.getDate() + 1);
      month = result.getMonth() + 1;
      days = result.getDate();
      mad = month + '/' + days;
      this.weekDays.push(mad);
    }

  }


}

