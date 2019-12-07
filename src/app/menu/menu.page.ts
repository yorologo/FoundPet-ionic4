import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  constructor(private menu: MenuController, private navCtrl: NavController, private storage: Storage, private angFireAuth: AngularFireAuth) { }

  ngOnInit() { }

  closeMenu(){
    this.menu.close();
  }

  goToHome(){
    this.menu.close();
    this.navCtrl.navigateForward('menu/search/home');
  }

  logout(){
    this.angFireAuth.auth.signOut();
    this.storage.remove('currentUID');
    this.navCtrl.navigateRoot("/login");
  }
}
