import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {
  newPostForm: FormGroup;
  photo: SafeResourceUrl;
  currenntCenter: any;
  defaultZoom = 14;
  animales = [
    { tipo: "Perro" },
    { tipo: "Gato" },
  ];
  reportes = [
    { tipo: "Perdido" },
    { tipo: "Encontrado" },
    { tipo: "Adopcion" },
  ];
  errorMessage: string = "";

  constructor(
    private toastCtrl: ToastController,
    private fireService: FirebaseService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController) {
      this.newPostForm = this.formBuilder.group({
        title: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ])
        ),
        animal: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        type: new FormControl(
          "",
          Validators.compose([
            Validators.required,
          ])
        ),
        description: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ])
        )        
      });
  }

  ngOnInit() { }

  newPost(data) {
    this.fireService.createPost(data, this.photo, this.currenntCenter).then(res => {
      this.presentToast(res);
      this.newPostForm.reset();
      this.photo = null;
      this.navCtrl.navigateForward("/menu/search/home");
    }).catch(err => {
      this.presentToast("Error al crear Post.");
    });
  }

  goToHome(){
    this.newPostForm.reset();
    this.photo = null;
    this.navCtrl.navigateForward('menu/search/home');
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      correctOrientation: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl,
    });
    this.photo = image.dataUrl;
  }

  async selectPicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      correctOrientation: false,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    });
    this.photo = image.dataUrl;
  }

  async getCurrentPosition() {
    const coodinates = await Plugins.Geolocation.getCurrentPosition();
    this.currenntCenter = {
      latitude: coodinates.coords.latitude,
      longitude: coodinates.coords.longitude
    }
  }

  onChoseLocation(event) {
    this.currenntCenter = {
      latitude: event.coords.lat,
      longitude: event.coords.lng
    }
  }
}
