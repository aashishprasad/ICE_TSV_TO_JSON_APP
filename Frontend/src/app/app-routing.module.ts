import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayPageComponent } from './display-page/display-page.component';


const routes: Routes = [
  { path: '', component: DisplayPageComponent,},
  { path: 'result/:filename', component: DisplayPageComponent,}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
