import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { mentors } from 'src/app/models/enums/mentors';
import { Person } from 'src/app/models/person';
import { locations } from 'src/app/models/enums/locations'
import { ModuleUtilsService } from 'src/app/services/module-utils.service';
import { skills } from 'src/app/models/enums/skills';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent extends ModuleUtilsService implements OnInit {

  person: Person = new Person();
  personMentor: any;
  personLocation: any;
  personSkills: any;

  mentors = mentors;
  locations = locations;
  skills = skills;

  personList: Person[] = [];

  showRegister = false;
  showEdit = false;

  constructor(public config: ConfigService) { super(); }

  ngOnInit(): void {
    this.getPeople();
  }

  cancel(){
    this.showEdit = false;
    this.showRegister = false;
    this.personLocation = null;
    this.personMentor = null;
    this.personSkills = null;
    this.person = new Person();
  }

  getPeople(){
    const list = JSON.parse(localStorage.getItem('people'));
    list ? this.personList = list : this.personList = [];
    this.getData();
  }

  fillSkills() {
    let list: any[] = [];
    this.personSkills.forEach((skill: { id: any; }) => {
      list.push(skill.id);
    });
    this.personSkills = list;
  }

  getData(){
    this.personList.forEach((person: any) => {
      const location = this.locations.find(loc => loc.id === person.location);
      const locationName = location ? location.name : '-';
      person.locationName = locationName;
    });
  }

  register(){
    this.fillSkills();
    if(this.showRegister){
      this.person.id = this.generateId();

      this.personList.push(this.person);
      this.showRegister = false;
    } else { //edit

    }
    localStorage.setItem('people', JSON.stringify(this.personList));
    //this.getPersons(); // reload data
  }
}
