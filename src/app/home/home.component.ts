import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild } from '@angular/core';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  json!: any;
  ReadMore:boolean = true;
  visible:boolean = false;
  @ViewChild('rifiuto') myInputVariable!:ElementRef;
  reset() {
    this.myInputVariable.nativeElement.value= '';
  }
  /** Based on the screen size, switch from standard to one column per row */
  waste! : File;
  constructor (private http: HttpClient,
    public dialog: MatDialog,
    public loaderService:LoaderService) {}
  

  onImageChanged(event : any) {
    this.waste = event.target.files[0];
  }

  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
  }
  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result is: ${result}')}
      );
  }

  newRubbish() {
    const uploadData = new FormData;
    uploadData.append('waste', this.waste);
    this.http.post('https://httpbin.org/post', uploadData).toPromise().then((data: any)=> {
      console.log(data);
      this.json = JSON.stringify(data);
    }
    )
  }
}