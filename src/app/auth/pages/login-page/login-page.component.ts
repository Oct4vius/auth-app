import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email:    ['octavio@gmail.com', [Validators.required, Validators.email] ],
    password: ['Octavio', [Validators.required, Validators.minLength(6)] ],
  });

  public login(){

    const { email, password } = this.myForm.value;

    this.authService.login( email, password )
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: ( message ) => {
          console.log(message)
        }
      })
  }

}
