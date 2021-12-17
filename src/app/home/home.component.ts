import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild } from '@angular/core';
import { getLocaleNumberFormat } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('rifiuto') myInputVariable!:ElementRef;
  reset() {
    this.myInputVariable.nativeElement.value= '';
  }
  /** Based on the screen size, switch from standard to one column per row */
  rifiuto! : File;
  constructor (private http: HttpClient,
    public dialog: MatDialog) {}
  

  onImageChanged(event : any) {
    this.rifiuto = event.target.files[0];
  }


  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result is: ${result}')}
      );
  }

  newRubbish() {
    const uploadData = new FormData;
    uploadData.append('rifiuto', this.rifiuto, this.rifiuto.name);
    this.http.post('https://0.0.0.0/prova', uploadData).subscribe (
      data => console.log(data),
      error => console.log(error)
    );
  }
 

}