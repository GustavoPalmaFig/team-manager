import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { mentors } from 'src/app/models/enums/mentors';
import { Person } from 'src/app/models/person';
import { locations } from 'src/app/models/enums/locations'
import { ModuleUtilsService } from 'src/app/services/module-utils.service';
import { skills } from 'src/app/models/enums/skills';
import { ConfigService } from 'src/app/services/config.service';
import { ToastComponent } from '../common/toast/toast.component';
import { ConfirmationService } from 'primeng/api';

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

  constructor(public config: ConfigService, private toast: ToastComponent, private confirmationService: ConfirmationService) { super(); }

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
    const list = JSON.parse(localStorage.getItem('people') || '{}');
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

  register() {
    this.fillSkills();
    if (this.showRegister) {
      this.person.id = this.generateId();
      this.personList.push(this.person);
      this.showRegister = false;
      this.toast.openToast('success', 'Pessoa Cadastrada com sucesso');
    } else { // is edit
      const personIndex = this.personList.findIndex(p => p.id === this.person.id);
      this.personList[personIndex] = this.person;
      this.showEdit = false;
      this.toast.openToast('success', 'Pessoa Editada com sucesso');
    }

    localStorage.setItem('people', JSON.stringify(this.personList));
    this.getPeople(); // reload data
  }

  editPerson(person: Person){
    this.person = Object.assign({}, person); //clona objeto
    this.showEdit = true;
    this.personLocation = this.locations.find(loc => loc.id === person.location);
    this.personMentor = this.mentors.find(mentors => mentors.id === person.mentorId);
    this.getSkills();
  }

  getSkills(){
    this.personSkills = [];
    let skill;
    if(this.personSkills){
      this.person.skills.forEach(skillId => {
        skill = this.skills.find(s => s.id === skillId);
        this.personSkills.push(skill);
      });
    }
  }
  delete(){
    this.confirmationService.confirm({
      message: `Você tem certeza que deseja excluir ${this.person.name}`,
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        const personIndex = this.personList.findIndex(p => p.id === this.person.id);
        this.personList.splice(personIndex, 1);
        this.showEdit = false;
        this.toast.openToast('succes' , 'Pessoa excluída com sucesso');
        localStorage.setItem('people', JSON.stringify(this.personList));
        this.cancel();
        this.getPeople();       
      },
    });
  }
}
