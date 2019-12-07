import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  validationMessages = {
    username: [
      {
        type: "required",
        message: "El nombre de usuario es requerido"
      },
      {
        type: "pattern",
        message: "El nombre de usuario es invalido"
      },
      {
        type: "minlength",
        message: "El nombre de usuario debe contener minimo 3 caracteres"
      },
      {
        type: "maxlength",
        message: "El nombre de usuario debe contener maximo 16 caracteres"
      }
    ],
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
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthenticateService) {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z][a-zA-Z0-9_-]*$"),
          Validators.minLength(3),
          Validators.maxLength(16)
        ])
      ),
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

  registerUser(userData) {
    this.authService.registerUser(userData).then(res => {
      this.presentToast(res);
      this.navCtrl.navigateForward("login");
    }).catch(err => {
      this.presentToast("Error al registrar el usuario.");
    });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  goToLogin() {
    this.registerForm.reset();
    this.navCtrl.navigateForward("login");
  }
}

