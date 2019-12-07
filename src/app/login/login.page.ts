import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessages = {
    email: [
      {
        type: "required",
        message: "El email es requerido"
      },
      {
        type: "pattern",
        message: "No es un email valido"
      }
    ],
    password: [
      {
        type: "required",
        message: "La contraseña es requerida"
      },
      {
        type: "minlength",
        message: "La contraseña es demasiado corta"
      }
    ]
  };
  errorMessage: string = "";

  constructor(
    private toastCtrl: ToastController,
    private fs: FirebaseService,
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    });
  }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then(res => {
      this.errorMessage = "";
      this.navCtrl.navigateForward("/menu/search/home");
    }).catch(err => {
      this.errorMessage = "Usuario o contraseña incorrectos.";
      this.presentToast("Error al iniciar secion.");
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goToRegister() {
    this.loginForm.reset();
    this.navCtrl.navigateForward("register");
  }
}
