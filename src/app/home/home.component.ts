import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ViewChild } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { WrongPredictionService } from './wrong-prediction.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(1100)
      ])
    ]),
  ]
})
export class HomeComponent {
  url="";
  url1="https://i.ibb.co/p3mJfCg/gif1.gif";
  ids : any;
  json!: any;
  ReadMore:boolean = true;
  visible:boolean = false;
  @ViewChild('rifiuto') myInputVariable!:ElementRef;
  reload(){
    window.location.reload();
  }
  reset() {
    this.myInputVariable.nativeElement.value= '';
  }
  /** Based on the screen size, switch from standard to one column per row */
  filename! : File;
  constructor (private http: HttpClient,
    public dialog: MatDialog,
    public loaderService:LoaderService,
    public wrongPredictionService: WrongPredictionService) {}
  

  onImageChanged(event : any) {
    this.filename = event.target.files[0];
    this.url1="https://i.ibb.co/8mbrkXx/gif2.gif";
  }

  onSend(event: any) {
    this.url1="https://i.ibb.co/rvNGj46/gif3.gif";
  }
  onclick() {
    this.ReadMore = !this.ReadMore;
    this.visible = !this.visible;
  }
  openDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result is: ${result}')}
      );
  }

  newRubbish() {
    const uploadData = new FormData;
    uploadData.append('filename', this.filename);
    this.http.post('https://django-cloudrun-f45setczna-uc.a.run.app/recognition/', uploadData).toPromise().then((data: any)=> {
      console.log(data);
      this.ids = JSON.stringify(data[0].id);
      this.json = JSON.stringify(data[0].displayNames).replace('"[\'','').replace('\']"','');
      let dialogRef = this.dialog.open(DialogComponent, {
        data: {name: this.json,
              ids: this.ids},
        disableClose: true
      });
    }
    )
  }
  wrongPred (pk: number) {
    pk = this.ids;
    const newFormData = {id : this.ids, displayNames : "undefined"};
    this.wrongPredictionService.sendWrongPred(pk, newFormData);
  }

  savePred (pk: number) {
    pk = this.ids;
    const lable = this.json;
    const newFormData = {id: this.ids, displayNames: lable}
    this.wrongPredictionService.savePred(pk, newFormData);
  }

  onselectFile(e: any) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }
}