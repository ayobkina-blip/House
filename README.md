# House

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Estructura del Proyecto

El directorio `src/` contiene el código principal de la aplicación organizado de la siguiente manera:

```
src/
├── app/
│   ├── Componentes/
│   │   ├── anadir-vecino/           # Componente Añadir Vecino
│   │   │   ├── anadir-vecino.ts
│   │   │   ├── anadir-vecino.html
│   │   │   ├── anadir-vecino.css
│   │   │   └── anadir-vecino.spec.ts
│   │   ├── casa/                    # Componente Casa
│   │   │   ├── casa.ts
│   │   │   ├── casa.html
│   │   │   ├── casa.css
│   │   │   └── casa.spec.ts
│   │   ├── casas/                   # Componente Lista de Casas
│   │   │   ├── casas.ts
│   │   │   ├── casas.html
│   │   │   ├── casas.css
│   │   │   └── casas.spec.ts
│   │   ├── detalles-casa/           # Componente Detalles de Casa
│   │   │   ├── detalles-casa.ts
│   │   │   ├── detalles-casa.html
│   │   │   ├── detalles-casa.css
│   │   │   └── detalles-casa.spec.ts
│   │   ├── detalles-vecino/         # Componente Detalles de Vecino
│   │   │   ├── detalles-vecino.ts
│   │   │   ├── detalles-vecino.html
│   │   │   └── detalles-vecino.css
│   │   ├── star/                    # Componente Estrellas (Valoración)
│   │   │   ├── star.ts
│   │   │   ├── star.html
│   │   │   └── star.css
│   │   ├── ver-evolucion-precios/   # Componente Ver Evolución de Precios
│   │   │   ├── ver-evolucion-precios.ts
│   │   │   ├── ver-evolucion-precios.html
│   │   │   └── ver-evolucion-precios.css
│   │   ├── ver-reparaciones/        # Componente Ver Reparaciones
│   │   │   ├── ver-reparaciones.ts
│   │   │   ├── ver-reparaciones.html
│   │   │   └── ver-reparaciones.css
│   │   └── ver-vecinos/             # Componente Ver Vecinos
│   │       ├── ver-vecinos.ts
│   │       ├── ver-vecinos.html
│   │       └── ver-vecinos.css
│   ├── Servicios/
│   │   ├── house-service.ts         # Servicio principal de gestión de casas
│   │   └── house-service.spec.ts    # Tests del servicio
│   ├── Interfaces/
│   │   ├── evolucion-precios-interface.ts  # Interfaz de evolución de precios
│   │   ├── house-interface.ts              # Interfaz de datos de casa
│   │   ├── reparacion-interface.ts         # Interfaz de reparaciones
│   │   └── vecino-interface.ts             # Interfaz de vecinos
│   ├── Configuración de la Aplicación/
│   │   ├── app.config.ts           # Configuración de la aplicación
│   │   ├── app.routes.ts           # Configuración de rutas
│   │   ├── app.ts                  # Componente principal de la app
│   │   ├── app.html                # Plantilla principal de la app
│   │   ├── app.css                 # Estilos principales de la app
│   │   └── app.spec.ts             # Tests del componente principal
│   └── Recursos/
│       └── casa1.jpg               # Imagen de casa
├── index.html                      # Archivo HTML principal
├── main.ts                         # Punto de entrada de la aplicación
└── styles.css                      # Estilos globales
```