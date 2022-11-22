import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';
import { ActivatedRoute, Router } from '@angular/router'
import { PeliculaService } from 'src/app/services/pelicula.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  //propiedades
  enviado = false;
  peliculaGenero: any = ['Acción', 'Terror', 'Superhéroes', 'Drama', 'Comedia'];
  editarForm: FormGroup;
  peliculaData: Pelicula[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private peliculaService: PeliculaService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getPelicula(id);
    this.editarForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      genero: ['',[Validators.required]],
      director: ['',[Validators.required,]],
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

  mainForm(){
    this.editarForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      genero: ['',[Validators.required]],
      director: ['',[Validators.required,]],
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
    this.editarForm.get('genero').setValue(d,{
      onlySelf: true,
    });
  }

  //Getter para acceder a los controles del formulario
  get myForm(){
    return this.editarForm.controls;
  }

  //Buscar a la película que vamos a modificar
  getPelicula(id){
    this.peliculaService.getPelicula(id).subscribe((data) => {
      this.editarForm.setValue({
        nombre: data['nombre'],
        genero: data['genero'],
        director: data['director'],
        anio: data['anio'],
        poster: data['poster'],
      });
    });
  }

  //Método que se ejecuta cuando se envía el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.editarForm.valid){
      return false;
    }else{
      if(window.confirm('Estás seguro que la deseas modificar?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.peliculaService.updatePelicula(id,this.editarForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/listar-peliculas');
            console.log('Se actualzió correctamente');
          },
          error: (e) => {
            console.log(e);
          },
          });
      }
    }
  }

}
