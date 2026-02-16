import { Routes } from '@angular/router';

import { ViviendasComponent } from './Viviendas/viviendas.component';
import { DetallesVivComponent } from './DetallesVivienda/DetallesViv.component';
import { EditVivComponent } from './EditVivienda/EditViv.component';


const routeConfig: Routes = [
  {
    path: '',
    component: ViviendasComponent,
    title: 'Home page'
  },
  {
    path: 'DescViv/:id',
    component: DetallesVivComponent,    
    title: 'Detallles de la vivienda'
  },
  {
    path: 'EditViv/:id',
    component: EditVivComponent,    
    title: 'Detallles de la vivienda'
  },
  {
    path: 'EditViv',
    component: EditVivComponent,    
    title: 'Detallles de la vivienda'
  },

];

export default routeConfig;
