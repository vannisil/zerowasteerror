import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  rifiuto! : File;

  constructor (private http: HttpClient) {}
  

  onImageChanged(event : any) {
    this.rifiuto = event.target.files[0];
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