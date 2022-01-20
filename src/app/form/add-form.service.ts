import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormComponent } from './form.component';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddFormService {
  constructor(private http: HttpClient) {}
  saveFormData(data: any) {
    console.log(data);
    return this.http.put('https://django-cloudrun-wnlsr6dhpq-uc.a.run.app/form_upload/?pk=this.pk', data);
  }

  updateDisplayNames(pk: number, updatedBody: any) {
    const endpointURL = 'https://django-cloudrun-f45setczna-uc.a.run.app/form_upload/?pk='+pk;
    return this.http.put(endpointURL, updatedBody)
  }
}
