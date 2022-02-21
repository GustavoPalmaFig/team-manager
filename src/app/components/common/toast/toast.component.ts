import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {

   }

  ngOnInit(): void {
  }

  openToast(severity: string,  title: string, subtitle?: string) {
    this.messageService.add({severity, summary: title, detail: subtitle});
  }

}
