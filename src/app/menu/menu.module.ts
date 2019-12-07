import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "search",
        loadChildren: () =>
          import("../search/search.module").then(m => m.SearchPageModule)
      },
      {
        path: "new-post",
        loadChildren: () =>
          import("../new-post/new-post.module").then(m => m.NewPostPageModule)
      },
      {
        path: "",
        redirectTo: "search",
        pathMatch: "full"
      },
      {
        path: "post-details",
        loadChildren: () =>
          import("../post-details/post-details.module").then(m => m.PostDetailsPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
