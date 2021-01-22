import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from 'src/app/services/estados/estados.service';
import { PaisesService } from 'src/app/services/paises/paises.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  personaForm: FormGroup;

  personas: any;
  paises: any;
  estados: any;
  constructor(
    public personasService: PersonaService,
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required],
    });

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
}
