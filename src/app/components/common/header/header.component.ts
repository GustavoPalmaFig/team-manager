import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideOptions: boolean;
  isHome: boolean;
  homeRoute = '/home';
  teamsRoute = '/teams';
  personsRoute = '/persons';
  studyRoute = '/studies';

  sideBarVisible = false;

  constructor(public config: ConfigService, public router: Router) { }

  ngOnInit() {
    this.isHome = this.router.url === this.homeRoute;
    this.hideOptions = this.config.mobile || this.config.smallDesktop;
  }
}
