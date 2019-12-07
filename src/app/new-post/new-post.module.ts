import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from "@agm/core";

import { IonicModule } from '@ionic/angular';

import { NewPostPage } from './new-post.page';

const routes: Routes = [
  {
    path: '',
    component: NewPostPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [NewPostPage]
})
export class NewPostPageModule {}
