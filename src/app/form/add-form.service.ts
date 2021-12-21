import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddFormService {

  constructor(private http: HttpClient) { }
  saveFormData(data: any) {
    console.log(data);
    return this.http.post('url', data);
  }
}
