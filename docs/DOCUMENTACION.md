# Documentación Detallada de Componentes - Sistema House

## Introducción

Este documento describe en detalle cada componente del sistema House, una aplicación Angular para la gestión completa de propiedades, vecinos, reparaciones y evolución de precios. El sistema permite administrar múltiples casas con sus respectivos inquilinos, seguimiento de costos de reparaciones, historial de precios y valoraciones.

## Arquitectura de Componentes

El sistema está organizado en componentes modulares que se comunican a través del servicio central `HouseService`. Cada componente tiene una responsabilidad específica y mantiene su propio estado interno.

### Flujo Principal de la Aplicación

```
casas (lista) → detalles-casa → ver-vecinos → anadir-vecino
                 ↓               ↓              ↓
         ver-evolucion-precios  detalles-vecino
                 ↓
         ver-reparaciones
```

---

## Documentación Detallada por Componente

### 1. Componente: Casas

**Ubicación:** `src/app/casas/`

**Propósito:** Componente principal que muestra la lista completa de casas disponibles con funcionalidades de filtrado y gestión.

**Funcionalidades Clave:**
- **Carga de casas**: Obtiene todas las casas del sistema mediante `getAllHouse()`
- **Filtrado por ciudad**: Permite filtrar dinámicamente las casas por nombre de ciudad
- **Eliminación de lista**: Elimina casas de la lista visual sin recargar
- **Gestión de duplicados**: Agrega casas duplicadas a la lista
- **Detección de cambios**: Usa `ChangeDetectorRef` para actualizaciones reactivas

**Métodos Principales:**
```typescript
ngOnInit(): Carga inicial de casas
filterCasas(): Filtrado dinámico por ciudad
eliminarDeLista(id): Eliminación visual de casa
agregarCasaDuplicada(casa): Agrega casa duplicada
```

**Dependencias:**
- `HouseService`: Para operaciones CRUD
- `Casa`: Componente hijo para cada casa individual
- `FormsModule`: Para formulario de filtrado

**Casos de Uso:**
- Vista principal del sistema
- Búsqueda de propiedades por ubicación
- Gestión rápida de casas

---

### 2. Componente: Casa

**Ubicación:** `src/app/casa/`

**Propósito:** Componente individual que representa una casa con acciones de gestión y sistema de valoración.

**Funcionalidades Clave:**
- **Visualización de casa**: Muestra información completa de una propiedad
- **Sistema de valoración**: Ciclo de valoración con estrellas (1-5)
- **Eliminación de casa**: Borra casa del sistema
- **Duplicación de casa**: Crea copia exacta de una casa
- **Manejo de imágenes**: Gestión de errores de carga con imagen por defecto

**Métodos Principales:**
```typescript
borrarCasa(): Elimina casa y emite evento
duplicarCasa(): Crea duplicado de la casa
ClickSobreEstrellas(): Sistema cíclico de valoración
onImageError(): Manejo de errores de imagen
```

**Interacciones:**
- Emite eventos `casaBorrada` y `casaDuplicada` al componente padre
- Usa componente `Star` para sistema de valoración
- Se integra con `HouseService` para operaciones CRUD

**Casos de Uso:**
- Vista individual de propiedad
- Gestión rápida de casas
- Valoración de propiedades

---

### 3. Componente: Anadir Vecino

**Ubicación:** `src/app/anadir-vecino/`

**Propósito:** Formulario especializado para añadir nuevos vecinos a una casa específica.

**Funcionalidades Clave:**
- **Formulario de vecino**: Campos para nombre, apellido y email
- **Asociación automática**: Vincula el vecino con la casa actual
- **Navegación inteligente**: Redirige automáticamente a la lista de casas

**Métodos Principales:**
```typescript
guardar(): Guarda vecino y navega a casas
cancelar(): Cancela operación y navega a casas
```

**Dependencias:**
- `HouseService`: Para guardar vecinos
- `ActivatedRoute`: Para obtener ID de casa
- `FormsModule`: Para manejo de formulario

**Casos de Uso:**
- Adición rápida de inquilinos
- Registro de nuevos residentes

---

### 4. Componente: Detalles Casa

**Ubicación:** `src/app/detalles-casa/`

**Propósito:** Formulario completo para creación y edición de casas con modo dual.

**Funcionalidades Clave:**
- **Modo dual**: Funciona como creación o edición según el contexto
- **Formulario completo**: Campos para todos los atributos de casa
- **Detección automática**: Identifica si es edición o creación por URL
- **Validación implícita**: Verifica datos antes de guardar

**Métodos Principales:**
```typescript
guardar(): Guarda o actualiza según modo
cancelar(): Cancela y navega a lista
ngOnInit(): Detecta modo y carga datos si es edición
```

**Interacciones:**
- Usa `ActivatedRoute` para detectar modo
- Se integra con `HouseService` para operaciones CRUD
- Navegación inteligente según contexto

**Casos de Uso:**
- Creación de nuevas propiedades
- Edición de propiedades existentes

---

### 5. Componente: Detalles Vecino

**Ubicación:** `src/app/detalles-vecino/`

**Propósito:** Formulario para gestión completa de vecinos con modo creación/edición.

**Funcionalidades Clave:**
- **Modo dual**: Creación o edición según parámetros URL
- **Gestión de ID location**: Asigna automáticamente la casa
- **Navegación contextual**: Regresa a lista de vecinos de la casa

**Métodos Principales:**
```typescript
guardar(): Crea o actualiza vecino
cancelar(): Navega a lista de vecinos
ngOnInit(): Detecta modo y carga datos
```

**Dependencias:**
- `HouseService`: Para operaciones de vecinos
- `ActivatedRoute`: Para parámetros de ruta

**Casos de Uso:**
- Registro de nuevos inquilinos
- Actualización de datos de residentes

---

### 6. Componente: Star (Estrellas)

**Ubicación:** `src/app/star/`

**Propósito:** Componente reutilizable de valoración visual con estrellas interactivas.

**Funcionalidades Clave:**
- **Visualización de estrellas**: Muestra 1-5 estrellas según rating
- **Interactividad**: Permite clic para cambiar valoración
- **Estado visual**: Diferencia visual entre estrellas llenas y vacías
- **Eventos personalizados**: Emite eventos al hacer clic

**Métodos Principales:**
```typescript
get stars(): Genera array [1,2,3,4,5]
isFilled(starNumber): Verifica si estrella debe estar llena
onStarClick(): Emite evento de clic
```

**Interacciones:**
- Recibe `@Input() rating` para estado inicial
- Emite `@Output() ratingClicked` al interactuar
- Componente standalone, no depende de otros

**Casos de Uso:**
- Sistema de valoración de casas
- Calificación de servicios
- Feedback visual

---

### 7. Componente: Ver Evolución Precios

**Ubicación:** `src/app/ver-evolucion-precios/`

**Propósito:** Gestión avanzada del historial de precios con operaciones masivas y análisis.

**Funcionalidades Clave:**
- **Historial completo**: Muestra evolución de precios ordenada por fecha
- **Análisis de variación**: Calcula diferencia entre precio inicial y actual
- **Operaciones masivas**: Edición universal de fechas y precios
- **Eliminación por rangos**: Elimina registros por rangos de precio o fecha
- **Gestión de precios**: Añade, elimina y actualiza registros

**Métodos Principales:**
```typescript
guardarEvolucion(): Añade nuevo registro de precio
eliminarEvolucion(id): Elimina registro específico
getCurrentPrice(): Obtiene precio más reciente
getPriceVariation(): Calcula variación de precio
editarFechaMasiva(): Edita fecha de todos los registros
editarPrecioMasivo(): Edita precio de todos los registros
eliminarPorRangoPrecio(): Elimina por rango de precios
eliminarPorRangoFechas(): Elimina por rango de fechas
```

**Características Avanzadas:**
- **Confirmación de operaciones**: Diálogos de confirmación para operaciones destructivas
- **Procesamiento paralelo**: Usa `Promise.all()` para operaciones masivas
- **Estados de carga**: Indicadores visuales durante operaciones largas
- **Ordenamiento inteligente**: Orden automático por fecha descendente

**Casos de Uso:**
- Seguimiento de valor de propiedades
- Análisis de tendencias de mercado
- Gestión histórica de precios

---

### 8. Componente: Ver Reparaciones

**Ubicación:** `src/app/ver-reparaciones/`

**Propósito:** Sistema completo de gestión de reparaciones con funcionalidades avanzadas de análisis y operaciones masivas.

**Funcionalidades Clave:**
- **Registro de reparaciones**: Añade nuevas reparaciones con fecha y costo
- **Historial completo**: Muestra todas las reparaciones ordenadas por fecha
- **Cálculo automático**: Suma total de costos de reparaciones
- **Operaciones masivas**: Edición universal de fechas y precios
- **Eliminación por rangos**: Elimina registros por criterios específicos

**Métodos Principales:**
```typescript
guardarReparacion(): Añade nueva reparación
eliminarReparacion(id): Elimina reparación específica
getTotalCost(): Calcula costo total de todas las reparaciones
editarFechaMasiva(): Edita fecha de todas las reparaciones
editarPrecioMasivo(): Edita precio de todas las reparaciones
eliminarPorRangoPrecio(): Elimina por rango de costos
eliminarPorRangoFechas(): Elimina por rango de fechas
```

**Características Avanzadas:**
- **Análisis financiero**: Cálculo automático de costos totales
- **Operaciones batch**: Procesamiento masivo con confirmación
- **Gestión de estados**: Indicadores de operaciones en progreso
- **Validación de datos**: Verificación de fechas y precios

**Casos de Uso:**
- Seguimiento de mantenimiento
- Análisis de costos de reparación
- Gestión de historial de mantenimiento

---

### 9. Componente: Ver Vecinos

**Ubicación:** `src/app/ver-vecinos/`

**Propósito:** Gestión completa de vecinos con funcionalidades avanzadas de filtrado y control de ocupación.

**Funcionalidades Clave:**
- **Lista de vecinos**: Muestra todos los vecinos de una casa
- **Gestión de ocupación**: Actualiza automáticamente unidades disponibles
- **Eliminación por dominio**: Elimina vecinos por dominio de email
- **Formulario integrado**: Añade nuevos vecinos directamente
- **Control de capacidad**: Gestiona límite de unidades disponibles

**Métodos Principales:**
```typescript
guardarVecino(): Añade vecino y actualiza unidades
eliminarVecino(id): Elimina vecino y libera unidad
eliminarPorDominio(): Elimina vecinos por dominio de email
loadVecinos(): Carga lista de vecinos
loadHouseData(): Actualiza datos de la casa
```

**Características Avanzadas:**
- **Gestión automática**: Actualiza `availableUnits` al añadir/eliminar
- **Eliminación inteligente**: Permite eliminar por dominio de correo
- **Validación de capacidad**: Evita sobrepasar límite de unidades
- **Sincronización de datos**: Mantiene consistencia entre casas y vecinos

**Casos de Uso:**
- Gestión de inquilinos
- Control de ocupación
- Administración masiva de residentes

---

## Servicios y Interfaces

### HouseService
**Ubicación:** `src/app/house-service.ts`

Servicio central que proporciona toda la lógica de negocio para:
- Operaciones CRUD de casas
- Gestión de vecinos
- Control de reparaciones
- Historial de precios
- Comunicación con API backend

### Interfaces Principales
- **HouseInterface**: Estructura de datos para casas
- **VecinoInterface**: Estructura de datos para vecinos
- **ReparacionInterface**: Estructura de datos para reparaciones
- **EvolucionPreciosInterface**: Estructura de datos para evolución de precios

---

## Flujo de Navegación Típico

1. **Inicio**: Usuario ve lista de casas (`/casas`)
2. **Selección**: Usuario hace clic en una casa → `/detalles-casa/:id`
3. **Gestión**: Desde detalles puede:
   - Ver vecinos → `/ver-vecinos/:id`
   - Ver reparaciones → `/ver-reparaciones/:id`
   - Ver evolución precios → `/ver-evolucion-precios/:id`
4. **Acciones**: Desde cada vista puede:
   - Añadir nuevos registros
   - Editar existentes
   - Eliminar individualmente o por lotes
   - Realizar operaciones masivas

---

## Consideraciones Técnicas

### Patrones de Diseño Utilizados
- **Component Architecture**: Cada componente tiene responsabilidad única
- **Service Pattern**: Lógica de negocio centralizada en servicios
- **Observable Pattern**: Uso de Promises para operaciones asíncronas
- **Input/Output Pattern**: Comunicación entre componentes padre-hijo

### Buenas Prácticas Implementadas
- **Change Detection**: Uso de `ChangeDetectorRef` para actualizaciones manuales
- **Form Handling**: Uso de `FormsModule` para gestión de formularios
- **Route Management**: Uso de `ActivatedRoute` para parámetros de URL
- **Error Handling**: Manejo de errores con imágenes por defecto
- **User Confirmation**: Diálogos de confirmación para operaciones destructivas

### Optimizaciones de Rendimiento
- **Lazy Loading**: Componentes cargados bajo demanda
- **Batch Operations**: Operaciones masivas con `Promise.all()`
- **Efficient Filtering**: Filtrado client-side para mejor UX
- **Smart Navigation**: Redirección inteligente según contexto
