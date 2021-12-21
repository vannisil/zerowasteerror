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
    waste!: string;
    json: any;

    reload(){
      window.location.reload();
    }
    getImageForm() {
      this.http.get('https://httpbin.org/get').toPromise().then((data: any)=>{
        console.log(data.url);
        this.json = JSON.stringify(data.url);
        this.waste = JSON.stringify(data.url);
      })
    }
    addLable = new FormGroup ({
      lable: new FormControl(''),
      waste: new FormControl('')
    })
    saveData() {
      this.addForm.saveFormData(this.addLable.value).subscribe((result)=>{
        console.log(result);
      });
    }
    addText() {
      
    }
}
