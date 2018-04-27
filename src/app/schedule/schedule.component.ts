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
    if(schedule !== undefined){

    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].monday !== "OFF"){
          this.monday++; 
      }
    }
    if(this.monday < 2){
      this.missedDay.Day = "Monday";
      this.missedDay.amount = this.monday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
    }
    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].tuesday !== "OFF"){
          this.tuesday++;
      }
    } 
    if(this.tuesday < 2){
      this.missedDay.Day = "Tuesday";
      this.missedDay.amount = this.tuesday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
    }
    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].wednesday !== "OFF"){
          this.wednesday++;
          
      }
    } 
    if(this.wednesday < 2){
      this.missedDay.Day = "Wednesday";
      this.missedDay.amount = this.wednesday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
    }
    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].thursday !== "OFF"){
          this.thursday++;
      }
    } 

    if(this.thursday < 2){
      this.missedDay.Day = "Thursday";
      this.missedDay.amount = this.thursday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
    }
    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].friday !== "OFF"){
          this.friday++;
      }
    } 
    if(this.friday < 2){
      this.missedDay.Day = "Friday";
      this.missedDay.amount = this.friday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
    }
    for(var i= 0; i < schedule.length; i++){
      if(schedule[i].teammateType === "Anesthesia" && schedule[i].saturday !== "OFF"){
          this.saturday++;
      }
    }
    if(this.saturday < 2){
      this.missedDay.Day = "Saturday";
      this.missedDay.amount = this.saturday;
      this.missingDays.push(this.missedDay);
      this.missedDay= {Day: '', amount: 0};
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
    var result = new Date(day);
    var month = result.getMonth() + 1;
    var days = result.getDate();
    var mad = month + '/' + days;
    this.weekDays.push(mad);

    for(var i = 0; i < 6; i++){

      result.setDate(result.getDate() + 1);
      month = result.getMonth() + 1;
      days = result.getDate();
      mad = month + '/' + days;
      this.weekDays.push(mad);
    }
    
  }


}

