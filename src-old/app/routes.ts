import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { EdLocationComponent } from "./ed-location/ed-location.component";
import { vecinosComponent } from "./vecinos/vecinos.component";

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'home',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
    },
    {
      path: 'Editar/:id',
      component: EdLocationComponent,
      title: 'Editar location'
    },
    {
      path: 'Nuevo',
      component: EdLocationComponent,
      title: 'Nuevo'
    },
    {
      path: 'VerVecinos/:id',
      component: vecinosComponent,
      title: 'Home details'
    },
  ];
  
  export default routeConfig;
