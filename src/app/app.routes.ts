import { Routes } from '@angular/router';
import { Casas } from './casas/casas';
import { DetallesCasa } from './detalles-casa/detalles-casa';
import { AnadirVecino } from './anadir-vecino/anadir-vecino';
import { VerVecinos } from './ver-vecinos/ver-vecinos';
import { DetallesVecino } from './detalles-vecino/detalles-vecino';
import { VerReparaciones } from './ver-reparaciones/ver-reparaciones';
import { VerEvolucionPrecios } from './ver-evolucion-precios/ver-evolucion-precios';

export const routes: Routes = [
  { path: 'casas', component: Casas },
  { path: 'detalles-casa/:id', component: DetallesCasa },
  { path: 'nueva-casa', component: DetallesCasa },
  { path: 'ver-vecinos/:id', component: VerVecinos },
  { path: 'detalles-vecino/:id', component: DetallesVecino },
  { path: 'anadir-vecino/:id', component: AnadirVecino },
  { path: 'ver-reparaciones/:id', component: VerReparaciones },
  { path: 'ver-evolucion-precios/:id', component: VerEvolucionPrecios },
  { path: '', redirectTo: 'casas', pathMatch: 'full' }
];
