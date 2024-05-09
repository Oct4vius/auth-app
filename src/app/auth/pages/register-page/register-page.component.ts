import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {


  private fb = inject( FormBuilder );
  private authService = inject( AuthService );

  public myForm: FormGroup = this.fb.group({
    name:         ['', [Validators.required, Validators.minLength(3)] ],
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required, Validators.minLength(6)] ],
    confPassword: ['', [Validators.required, Validators.minLength(6)] ],
  });

  public register(){

    if(this.myForm.value['password'] !== this.myForm.value['confPassword']){
      Swal.fire('Error', 'Passwords do not match', 'error')
      return;
    }

    const {confPassword, ...user} = this.myForm.value

    this.authService.register(user)
      .subscribe({
        next: () => {
          this.myForm.reset();
          Swal.fire('Register', 'User created successfully', 'success')
        },
        error: ( message ) => {
          Swal.fire('Error', message, 'error')
        }
      })

  }

}
