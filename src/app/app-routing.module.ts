import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CrearPeliculaComponent } from './pages/crear-pelicula/crear-pelicula.component';
import { EditarPeliculaComponent } from './pages/editar-pelicula/editar-pelicula.component';
import { ListarPeliculasComponent } from './pages/listar-peliculas/listar-peliculas.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'crear-pelicula' },
    { path: 'crear-pelicula', component: CrearPeliculaComponent },
    { path: 'editar-pelicula/:id', component: EditarPeliculaComponent },
    { path: 'listar-peliculas', component: ListarPeliculasComponent },
    { path: 'about', component: AboutComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}