import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Form, FormControl, FormGroup, } from '@angular/forms';
import { AddFormService } from './add-form.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { animate, style, transition, trigger } from '@angular/animations';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0}),
        animate(1100)
      ])
    ])
  ]
})
export class FormComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Compila il form qui sotto per aiutarci a riconoscere più rifiuti!', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Compila il form qui sotto per aiutarci a riconoscere più rifiuti!', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public http: HttpClient,
    private addForm: AddFormService,
    public dialog: MatDialog) {
    }
    upDispNames!: FormGroup;
    formImage:any=[];
    max!: number;
    id!: any;
    pk!: any;
    waste!: any;
    json: any;
    isShown: boolean = false ;

    ngOnInit(): void {
      this.upDispNames = new FormGroup({
        displayNames: new FormControl()
      })
    }

    reload(){
      window.location.reload();
    }
    
    getImageForm() {
      this.isShown= true;
      this.pk = this.getRandomInt(1,61);
      const url = 'https://django-cloudrun-f45setczna-uc.a.run.app/retrieve/?pk='+this.pk;
      this.http.get(url).toPromise().then((data: any)=>{
        console.log(data);
        console.log(this.pk);
        this.formImage = data;
        
      })
    }
    openDialog() {
      let dialogForm = this.dialog.open(DialogFormComponent, {
      });
    }
    getRandomInt(min:any, max:any) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    
    message = 'Aggiornamento completato!'

    updateDisplayNames(pk: number) {
      const lable = JSON.stringify(this.upDispNames.value).replace('{"displayNames":"','').replace('"}','');
      const newFormData = {id : this.pk, displayNames : lable};
      this.addForm.updateDisplayNames(pk, newFormData).subscribe((data:any)=>{
        console.log(this.message)
      });
    }
}
