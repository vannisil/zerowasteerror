import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';

export class Rifiuti {
  constructor(
    public lable: string 
  ) {}
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  rifiuto!: Rifiuti[];
  reload(){
    window.location.reload();
  }
  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
    this.getRifiuti();
  }
  getRifiuti() {
    this.http.get<any>('localhost').subscribe(
      response => {
        console.log(response);
        this.rifiuto = response;
      }
    )
  }

}
