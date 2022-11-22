import { Component, OnInit } from '@angular/core';
import { PeliculaService } from "src/app/services/pelicula.service";

@Component({
  selector: 'app-listar-peliculas',
  templateUrl: './listar-peliculas.component.html',
  styleUrls: ['./listar-peliculas.component.css']
})
export class ListarPeliculasComponent implements OnInit {

  Peliculas:any = [];

  constructor(private peliculaService: PeliculaService) {
    this.getPeliculas();
  }

  ngOnInit(): void {
  }

  //Método para obtener todas las películas
  getPeliculas(){
    this.peliculaService.getPeliculas().subscribe((data) => {
      this.Peliculas = data;
    })
  }

  //Método para eliminar una película
  eliminarPelicula(pelicula, index){
    if(window.confirm('¿Estás seguro que la deseas eliminar?')) {
      this.peliculaService.deletePelicula(pelicula._id).subscribe((data) => {
        this.Peliculas.splice(index,1);
      });
    }
  }

}
