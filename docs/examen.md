# 📚 Guía de Funcionalidades para Exámenes - Sistema House

Esta guía detalla las funcionalidades avanzadas implementadas en el proyecto, explicando cómo funcionan y qué archivos están involucrados en cada una.

---

## 🎯 1. Eliminación por Condición (Filter + Delete)

### ¿Cómo funciona?
1. **Filtra elementos** que cumplen una condición específica
2. **Crea promesas** para eliminar cada elemento encontrado
3. **Ejecuta en paralelo** todas las eliminaciones
4. **Recarga los datos** para actualizar la vista

### Archivos involucrados:
- **`src/app/ver-evolucion-precios/ver-evolucion-precios.ts`** (líneas 182-211)
- **`src/app/ver-reparaciones/ver-reparaciones.ts`** (líneas 161-190)

### Código real implementado:
```typescript
eliminarPorRangoPrecio() {
  // 1. Validación de inputs
  if (this.precioMin < 0 || this.precioMax <= 0 || this.precioMin > this.precioMax) {
    return;
  }

  // 2. Filtrar elementos que cumplen la condición
  const itemsAEliminar = this.lista.filter(item => 
    item.Precio >= this.precioMin && item.Precio <= this.precioMax
  );

  // 3. Verificar que hay elementos para eliminar
  if (itemsAEliminar.length === 0) {
    return;
  }

  // 4. Confirmación de usuario
  if (confirm(`¿Estás seguro de que quieres eliminar ${itemsAEliminar.length} registros?`)) {
    this.eliminandoPorRango = true;
    
    // 5. Crear promesas de eliminación
    const promesasEliminacion = itemsAEliminar.map(item => {
      return this.service.delete(item.id);
    });

    // 6. Ejecutar todas las eliminaciones en paralelo
    Promise.all(promesasEliminacion).then(() => {
      // 7. Limpiar estados y recargar datos
      this.eliminandoPorRango = false;
      this.precioMin = 0;
      this.precioMax = 0;
      this.loadData();
    });
  }
}
```

### Aplicación a tu ejemplo:
```typescript
// Para "Borrar casas con availableUnits = 5"
borrarCasasPorUnidades() {
  const casasAEliminar = this.casas.filter(casa => casa.availableUnits === 5);
  
  const promesasEliminacion = casasAEliminar.map(casa => 
    this.service.deleteHouse(casa.id)
  );
  
  Promise.all(promesasEliminacion).then(() => {
    this.loadCasas();
  });
}
```

---

## 🔧 2. Modificación Masiva por Condición

### ¿Cómo funciona?
1. **Recorre todos los elementos** de la lista
2. **Crea copias actualizadas** con el nuevo valor
3. **Genera promesas** para cada actualización
4. **Ejecuta en paralelo** todas las modificaciones

### Archivos involucrados:
- **`src/app/ver-evolucion-precios/ver-evolucion-precios.ts`** (líneas 135-179)
- **`src/app/ver-reparaciones/ver-reparaciones.ts`** (líneas 113-158)

### Código real implementado:
```typescript
editarPrecioMasivo() {
  // 1. Validación
  if (this.nuevoPrecioUniversal <= 0 || this.evolucionPrecios.length === 0) {
    return;
  }

  // 2. Confirmación con cantidad de elementos
  if (confirm(`¿Estás seguro de que quieres cambiar el precio de TODOS (${this.evolucionPrecios.length}) registros a €${this.nuevoPrecioUniversal}?`)) {
    this.editandoMasivamente = true;
    
    // 3. Crear promesas de actualización
    const promesasEdicion = this.evolucionPrecios.map(evolucion => {
      // 4. Crear copia actualizada (inmutabilidad)
      const evolucionActualizada = { ...evolucion, Precio: this.nuevoPrecioUniversal };
      return this.service.updateEvolucionPrecio(evolucion.id, evolucionActualizada);
    });

    // 5. Ejecutar todas las actualizaciones
    Promise.all(promesasEdicion).then(() => {
      // 6. Limpiar y recargar
      this.editandoMasivamente = false;
      this.nuevoPrecioUniversal = 0;
      this.loadEvolucionPrecios();
    });
  }
}
```

### Aplicación a tu ejemplo:
```typescript
// Para "Modificar casas con availableUnits = 5 y cambiarlas a 10"
modificarCasasPorUnidades() {
  const casasAModificar = this.casas.filter(casa => casa.availableUnits === 5);
  
  const promesasModificacion = casasAModificar.map(casa => {
    const casaActualizada = { ...casa, availableUnits: 10 };
    return this.service.updateHouse(casa.id, casaActualizada);
  });
  
  Promise.all(promesasModificacion).then(() => {
    this.loadCasas();
  });
}
```

---

## 📧 3. Eliminación por Patrón de Texto

### ¿Cómo funciona?
1. **Filtra elementos** que contienen un texto específico
2. **Elimina en lote** todos los elementos encontrados
3. **Actualiza propiedades relacionadas** automáticamente

### Archivos involucrados:
- **`src/app/ver-vecinos/ver-vecinos.ts`** (líneas 117-152)

### Código real implementado:
```typescript
eliminarPorDominio() {
  // 1. Validación del input
  if (!this.dominioCorreo.trim()) {
    return;
  }

  // 2. Filtrar por patrón de texto
  const vecinosAEliminar = this.vecinos.filter(vecino => 
    vecino.email.includes(this.dominioCorreo.trim())
  );

  // 3. Verificar resultados
  if (vecinosAEliminar.length === 0) {
    return;
  }

  // 4. Iniciar estado de eliminación
  this.eliminando = true;

  // 5. Crear promesas de eliminación
  const promesasEliminacion = vecinosAEliminar.map(vecino => {
    return this.service.deleteVecino(vecino.id);
  });

  // 6. Ejecutar eliminación en paralelo
  Promise.all(promesasEliminacion).then(() => {
    // 7. Actualización en cascada: liberar unidades disponibles
    if (this.casa) {
      this.casa.availableUnits += vecinosAEliminar.length;
      this.service.updateHouse(this.casa.id, this.casa).then(() => {
        this.loadHouseData();
      });
    }
    
    // 8. Limpiar estados y recargar
    this.eliminando = false;
    this.dominioCorreo = '';
    this.loadVecinos();
  });
}
```

### Aplicaciones típicas:
```typescript
// "Borrar usuarios con email @gmail.com"
eliminarPorGmail() {
  const usuariosAEliminar = this.usuarios.filter(usuario => 
    usuario.email.includes('@gmail.com')
  );
  // ... resto del código
}
```

---

## 📅 4. Eliminación por Rango de Fechas

### ¿Cómo funciona?
1. **Convierte strings a fechas** para comparación
2. **Filtra elementos** dentro del rango temporal
3. **Elimina en lote** los registros encontrados

### Archivos involucrados:
- **`src/app/ver-evolucion-precios/ver-evolucion-precios.ts`** (líneas 213-243)
- **`src/app/ver-reparaciones/ver-reparaciones.ts`** (líneas 192-222)

### Código real implementado:
```typescript
eliminarPorRangoFechas() {
  // 1. Validación de fechas
  if (!this.fechaInicio || !this.fechaFin || new Date(this.fechaInicio) > new Date(this.fechaFin)) {
    return;
  }

  // 2. Filtrar por rango de fechas
  const itemsAEliminar = this.lista.filter(item => {
    const fechaItem = new Date(item.Fecha);
    return fechaItem >= new Date(this.fechaInicio) && 
           fechaItem <= new Date(this.fechaFin);
  });

  // 3. Verificar resultados
  if (itemsAEliminar.length === 0) {
    return;
  }

  // 4. Confirmación con fechas
  if (confirm(`¿Estás seguro de que quieres eliminar ${itemsAEliminar.length} registros del ${this.fechaInicio} al ${this.fechaFin}?`)) {
    this.eliminandoPorRango = true;
    
    // 5. Eliminar en lote
    const promesasEliminacion = itemsAEliminar.map(item => {
      return this.service.delete(item.id);
    });

    Promise.all(promesasEliminacion).then(() => {
      // 6. Limpiar y recargar
      this.eliminandoPorRango = false;
      this.fechaInicio = '';
      this.fechaFin = '';
      this.loadData();
    });
  }
}
```

---

## 🔄 5. Actualización en Cascada

### ¿Cómo funciona?
1. **Realiza operación principal** (eliminar/añadir)
2. **Detecta elementos relacionados** que deben actualizarse
3. **Actualiza automáticamente** las propiedades relacionadas
4. **Mantiene consistencia** entre diferentes entidades

### Archivos involucrados:
- **`src/app/ver-vecinos/ver-vecinos.ts`** (líneas 81-95, 97-110)

### Código real implementado:
```typescript
guardarVecino() {
  // 1. Operación principal: guardar vecino
  this.service.addVecino(this.nuevoVecino).then(() => {
    // 2. Actualización en cascada: disminuir unidades disponibles
    if (this.casa && this.casa.availableUnits > 0) {
      this.casa.availableUnits -= 1;
      this.service.updateHouse(this.casa.id, this.casa).then(() => {
        this.loadHouseData();
      });
    }
    
    // 3. Recargar datos relacionados
    this.loadVecinos();
    this.showAddForm = false;
    this.resetForm();
  });
}

eliminarVecino(id: number) {
  if (confirm('¿Estás seguro de que quieres eliminar este vecino?')) {
    // 1. Operación principal: eliminar vecino
    this.service.deleteVecino(id).then(() => {
      // 2. Actualización en cascada: aumentar unidades disponibles
      if (this.casa) {
        this.casa.availableUnits += 1;
        this.service.updateHouse(this.casa.id, this.casa).then(() => {
          this.loadHouseData();
        });
      }
      // 3. Recargar datos
      this.loadVecinos();
    });
  }
}
```

---

## 🏗️ Arquitectura de Servicios

### Archivo central: `src/app/house-service.ts`

Este servicio contiene todos los métodos CRUD utilizados:

```typescript
// Métodos para casas
getAllHouse(): Promise<HouseInterface[]>
getOneHouse(id): Promise<HouseInterface>
addHouse(house): Promise<any>
updateHouse(id, house): Promise<any>
deleteHouse(id): Promise<any>

// Métodos para vecinos
getVecinosByHouse(id): Promise<VecinoInterface[]>
addVecino(vecino): Promise<any>
updateVecino(id, vecino): Promise<any>
deleteVecino(id): Promise<any>

// Métodos para reparaciones
getReparacionesByHouse(id): Promise<ReparacionInterface[]>
addReparacion(reparacion): Promise<any>
updateReparacion(id, reparacion): Promise<any>
deleteReparacion(id): Promise<any>

// Métodos para evolución de precios
getEvolucionPreciosByHouse(id): Promise<EvolucionPreciosInterface[]>
addEvolucionPrecio(evolucion): Promise<any>
updateEvolucionPrecio(id, evolucion): Promise<any>
deleteEvolucionPrecio(id): Promise<any>
```

---

## 🎯 Plantillas Universales para Exámenes

### Plantilla A: Eliminar por condición exacta
```typescript
eliminarPorCondicionExacta() {
  const elementosAEliminar = this.lista.filter(elemento => 
    elemento.propiedad === valorBuscado
  );
  
  const promesas = elementosAEliminar.map(elemento => 
    this.service.delete(elemento.id)
  );
  
  Promise.all(promesas).then(() => this.loadData());
}
```

### Plantilla B: Modificar por rango
```typescript
modificarPorRango() {
  const elementosAModificar = this.lista.filter(elemento => 
    elemento.numero >= min && elemento.numero <= max
  );
  
  const promesas = elementosAModificar.map(elemento => {
    const actualizado = { ...elemento, propiedad: nuevoValor };
    return this.service.update(elemento.id, actualizado);
  });
  
  Promise.all(promesas).then(() => this.loadData());
}
```

### Plantilla C: Operación con cascada
```typescript
operacionConCascada() {
  this.service.operacionPrincipal(id).then(() => {
    // Actualizar elementos relacionados
    this.elementoRelacionado.propiedad += cambio;
    this.service.updateRelacionado(this.elementoRelacionado.id, this.elementoRelacionado);
    
    // Recargar todo
    this.loadData();
    this.loadRelatedData();
  });
}
```

---

## 🔥 Checklist para el Examen

### ✅ Antes de codificar:
- [ ] Identificar qué condición se necesita filtrar
- [ ] Determinar si es eliminación o modificación
- [ ] Verificar si hay actualizaciones en cascada
- [ ] Pensar en validaciones necesarias

### ✅ Durante la codificación:
- [ ] Usar `filter()` para seleccionar elementos
- [ ] Usar `map()` para crear promesas
- [ ] Envolver en `Promise.all()` para ejecución paralela
- [ ] Añadir `confirm()` para operaciones destructivas
- [ ] Usar spread operator `{ ...item, prop: valor }`

### ✅ Después de codificar:
- [ ] Recargar datos con `loadData()`
- [ ] Limpiar estados y variables
- [ ] Manejar errores con `.catch()`
- [ ] Probar con diferentes valores

---

## 📝 Ejercicios de Práctica

### Ejercicio 1:
"Borrar todas las casas con rating menor a 3"

```typescript
borrarCasasPorRating() {
  const casasAEliminar = this.casas.filter(casa => casa.rating < 3);
  const promesas = casasAEliminar.map(casa => this.service.deleteHouse(casa.id));
  Promise.all(promesas).then(() => this.loadCasas());
}
```

### Ejercicio 2:
"Duplicar el precio de todas las reparaciones mayores a 100€"

```typescript
duplicarReparacionesCaras() {
  const reparacionesAModificar = this.reparaciones.filter(rep => rep.Precio > 100);
  const promesas = reparacionesAModificar.map(rep => {
    const actualizada = { ...rep, Precio: rep.Precio * 2 };
    return this.service.updateReparacion(rep.id, actualizada);
  });
  Promise.all(promesas).then(() => this.loadReparaciones());
}
```

### Ejercicio 3:
"Al añadir un vecino, poner rating 5 a su casa"

```typescript
guardarVecinoConRating() {
  this.service.addVecino(this.nuevoVecino).then(() => {
    // Cascada: actualizar rating de la casa
    this.casa.rating = 5;
    this.service.updateHouse(this.casa.id, this.casa);
    
    this.loadVecinos();
    this.showAddForm = false;
  });
}
```

**¡Con estos patrones estás preparado para cualquier ejercicio del examen!** 🎯
