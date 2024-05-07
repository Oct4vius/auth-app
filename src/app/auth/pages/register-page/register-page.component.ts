import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {


  private fb = inject( FormBuilder );

  public myForm: FormGroup = this.fb.group({
    name:         ['', [Validators.required, Validators.minLength(3)] ],
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required, Validators.minLength(6)] ],
    confPassword: ['', [Validators.required, Validators.minLength(6)] ],
  });

  public register(){

  }

}
