import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data;

  constructor(
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private fireService: FirebaseService,
  ) { }

  counter(i: number) {
    return new Array(i);
  }

  goToNewPost() {
    this.navCtrl.navigateForward("menu/new-post");
  }

  doRefresh(event) {
    this.getData();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async getData() {
    this.fireService.getPost().subscribe(lastItems => {
      this.data = lastItems;
    });
  }
}
