import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ImageButtonComponent } from './components/common/image-button/image-button.component';
import { PersonsComponent } from './components/persons/persons.component';
import { HeaderComponent } from './components/common/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask'
import {DropdownModule} from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect'
import {TableModule} from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastComponent } from './components/common/toast/toast.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { ConfigService } from './services/config.service';
import { StudiesComponent } from './components/studies/studies.component';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageButtonComponent,
    PersonsComponent,
    HeaderComponent,
    ToastComponent,
    StudiesComponent
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SidebarModule,
    InputTextModule,
    FormsModule,
    InputMaskModule,
    DropdownModule,
    MultiSelectModule,
    TableModule,
    ConfirmDialogModule,
    ToastModule,
    AccordionModule
   ],
  providers: [ConfigService, ConfirmationService, MessageService, ToastComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
