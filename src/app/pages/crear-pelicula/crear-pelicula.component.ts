import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  //propiedades
  peliculaForm: FormGroup;
  enviado = false;
  peliculaGenero: any = ['Acción', 'Terror', 'Superhéroes', 'Drama', 'Comedia'];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private peliculaService: PeliculaService
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm(){
    this.peliculaForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      genero: ['',[Validators.required]],
      director: ['',[Validators.required,],],
      anio: ['',
        [
          Validators.required,
          Validators.min(1888),
          Validators.max(2022),
        ],
      ],
      poster: ['', [Validators.required]],
    });
  }

  //Seleccionar un genero con un select
  actualizarGenero(d){
    this.peliculaForm.get('genero').setValue(d,{
      onlySelf: true,
    });
  }

  //Getter para acceder a los controles del formulario
  get myForm(){
    return this.peliculaForm.controls;
  }

  //Método que se ejecuta cuando el usuario envía el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.peliculaForm.valid){
      return false;
    }else{
      return this.peliculaService.agregarPelicula(this.peliculaForm.value).subscribe({
        complete: () => {
          console.log('Película agregada correctamente'),
          this.ngZone.run(() => this.router.navigateByUrl('/listar-peliculas'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

}
