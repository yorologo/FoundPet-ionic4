import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit {
  data;
  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goToHome(){
    this.data = null;
    this.navCtrl.navigateForward('menu/search/home');
  }

}
