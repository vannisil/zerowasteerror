import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

import { HomeComponent } from './home/home.component';
import { InizioComponent } from './inizio/inizio.component';
import { RicicloComponent } from './riciclo/riciclo.component';

const routes: Routes = [
{path:'home', component: HomeComponent},
{path:'inizio', component: InizioComponent},
{path:'riciclo', component: RicicloComponent},
{path:'form', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
