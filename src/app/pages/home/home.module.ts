import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
    ]),
    MatButtonModule,
    MatTableModule,
  ]
})
export class HomeModule { }
