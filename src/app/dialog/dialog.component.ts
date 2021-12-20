import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyedRead, ThrowStmt } from '@angular/compiler';
import { Time } from '@angular/common';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  public etichetta: any=[];

  reload(){
    window.location.reload();
  }
  constructor(private http: HttpClient) {
   }

  ngOnInit(): void {
    this.getData();

  }
  getData() {
    const url = 'https://jsonplaceholder.typicode.com/users'
    this.http.get(url).subscribe((res)=>{
      this.etichetta=res
      console.log(this.etichetta);
    })
  }

}
