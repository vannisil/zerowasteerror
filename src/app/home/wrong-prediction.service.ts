import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WrongPredictionService {

  constructor(private http: HttpClient) { }

  sendWrongPred (pk: number, body: any) {
    const endpointURL = 'https://django-cloudrun-f45setczna-uc.a.run.app/form_upload/?pk='+pk;
    return this.http.put(endpointURL, body)
  }

  savePred (pk: number, body: any) {
    const endpointURL = 'https://django-cloudrun-f45setczna-uc.a.run.app/form_upload/?pk='+pk;
    return this.http.put(endpointURL, body)
  }
}

