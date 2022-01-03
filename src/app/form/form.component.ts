import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { AddFormService } from './add-form.service';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
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
    private addForm: AddFormService) {
    }
    formImage:any=[];
    max!: number;
    id!: any;
    waste!: any;
    confidence!: any;
    json: any;

    reload(){
      window.location.reload();
    }
    
    getImageForm() {
      this.http.get('http://127.0.0.1:8000/retrieve/').toPromise().then((data: any)=>{
        console.log(data);
        this.formImage = data;
        this.id = this.getRandomInt(80,100);
        console.log(this.id);
      })
    }
    getImageForm1() {
      this.id = this.getRandomInt(40,50);
      this.http.get('http://127.0.0.1:8000/retrieve/', this.id).toPromise().then((data1:any)=>{
        console.log(data1);
        console.log(this.id);
        this.json= JSON.stringify(data1);
    })
    }

    getRandomInt(min:any, max:any) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    addLable = new FormGroup ({
      waste: new FormControl(''),
      lable: new FormControl(''),
      confidence: new FormControl('')
    })
    saveData() {
      this.addForm.saveFormData(this.addLable.value).subscribe((result)=>{
        console.log(result);
      });
    }
    addText() {
      
    }
}
