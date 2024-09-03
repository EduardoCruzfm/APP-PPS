import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { environment } from 'src/environments/environment'; 
import { SharedModule } from 'src/app/shared/shared.module';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    SharedModule,
    IonicModule
  ]
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  private auth = getAuth(initializeApp(environment.firebaseConfig));

  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  async handleLogin() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      if (typeof email === 'string' && typeof password === 'string') {
        try {
          await signInWithEmailAndPassword(this.auth, email, password);
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso',
            duration: 2000
          });
          toast.present();
          this.router.navigate(['/home']);
        } catch (error) {
          const toast = await this.toastController.create({
            message: 'Error al iniciar sesión. Por favor, intenta de nuevo.',
            duration: 2000
          });
          toast.present();
          console.error('Error de autenticación:', error);
        }
      } else {
        const toast = await this.toastController.create({
          message: 'Correo electrónico o contraseña inválidos',
          duration: 2000
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Formulario inválido',
        duration: 2000
      });
      toast.present();
    }
  }

  async handleRegister() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      if (typeof email === 'string' && typeof password === 'string') {
        try {
          await createUserWithEmailAndPassword(this.auth, email, password);
          const toast = await this.toastController.create({
            message: 'Registro exitoso',
            duration: 2000
          });
          toast.present();
          this.router.navigate(['/home']);
        } catch (error) {
          const toast = await this.toastController.create({
            message: 'Error al registrarse. Por favor, intenta de nuevo.',
            duration: 2000
          });
          toast.present();
          console.error('Error de autenticación:', error);
        }
      } else {
        const toast = await this.toastController.create({
          message: 'Correo electrónico o contraseña inválidos',
          duration: 2000
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: 'Formulario inválido',
        duration: 2000
      });
      toast.present();
    }
  }
}
