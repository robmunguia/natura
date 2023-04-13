import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { environment } from '../../../environments/environment';
declare const Email: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mailForm: FormGroup;
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder) {
    this.mailForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.compose([Validators.required, Validators.email])] ],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      city: ['', [Validators.required]],
      consultor: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  sendMail() {
    this.loading = true;
    if(this.mailForm.status.toLowerCase() === 'valid') {
      Email.send({
        Host: environment.Host,
        Username: environment.Username,
        Password: environment.Password,
        To: environment.To,
        From: 'vaguilar@naturaaguaviva.com',
        Subject: 'Nuevo Registro de Natura Agua Viva',
        Body : ` <h3>Informacion del Consultor registrado</h3>
        <ul>
          <li>Nombre: <b>${this.mailForm.value.name}</b></li>
          <li>Correo: ${this.mailForm.value.email}</li>
          <li>Telefono: <b>${this.mailForm.value.phone}</b></li>
          <li>Edad: <b>${this.mailForm.value.age}</b></li>
          <li>Parte de la republica: <b>${this.mailForm.value.city}</b></li>
          <li>Eres o Fuiste Consultor: <b>${this.mailForm.value.consultor}</b></li>
        </ul>`
        }).then( (message: any) => {
          this.loading = false;
          if (message.toLowerCase() === 'ok') {
            this.mailForm.reset();
            Swal.fire('Gracias por contactarnos', 'Su mensaje fue enviado correctamente, pronto recibirá respuesta de nosotros!', 'success');
          }
        } );
    }
  }

}
