import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  personaForm: FormGroup;
  paises: any;
  estados: any;
  personas: any;
  constructor(
    public route: Router,
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personasService: PersonaService
  ) {}
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.paisesService.getAllPaises().subscribe(
      (resp) => {
        this.paises = resp;
        // console.log(resp);
      },
      (error) => console.error(error)
    );

    this.personasService.getAllPersonas().subscribe(
      (resp) => {
        this.personas = resp;
      },
      (error) => console.error(error)
    );

    this.personaForm.get('pais').valueChanges.subscribe((value) => {
      this.estadosService.getEstadosById(value.id).subscribe(
        (resp) => {
          this.estados = resp;
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  guardar(): void {
    this.personasService.savePersona(this.personaForm.value).subscribe(
      (resp) => {
        this.personaForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // cargarEstadosPorPaisesID(event) {
  //   this.estadosService.getEstadosById(event.target.value).subscribe(
  //     (resp) => {
  //       this.estados = resp;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  navPersona(){
    this.route.navigate(["/listar"]);
  }
}
