import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeyedRead, ThrowStmt } from '@angular/compiler';
import { Time } from '@angular/common';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
  public json: any=[];
  visible:boolean = false;
  reload(){
    window.location.reload();
  }
  constructor(private http: HttpClient,
    public loaderService: LoaderService) {
   }

  ngOnInit(): void {
    this.getData();
    this.visible = !this.visible;
  }
  getData() {
    const url = 'https://jsonplaceholder.typicode.com/users'
    this.http.get(url).subscribe((data)=>{
      this.json=data;
      console.log(this.json);
    })
  }

}
