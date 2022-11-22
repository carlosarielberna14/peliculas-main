import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaService } from './services/pelicula.service';
import { CrearPeliculaComponent } from './pages/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './pages/editar-pelicula/editar-pelicula.component';
import { ListarPeliculasComponent } from './pages/listar-peliculas/listar-peliculas.component';
import { AboutComponent } from './pages/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    CrearPeliculaComponent,
    EditarPeliculaComponent,
    ListarPeliculasComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PeliculaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
