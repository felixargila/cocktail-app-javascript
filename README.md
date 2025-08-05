# Cocktails App - OpenCells con JavaScript

Una aplicación de cócteles desarrollada con **OpenCells** e implementada en **JavaScript** (convertida desde TypeScript).

## 🔄 Conversión TypeScript → JavaScript

Este proyecto ha sido **convertido exitosamente** de TypeScript a JavaScript **manteniendo todas las dependencias y funcionalidades de OpenCells**.

### ✅ **Cambios Realizados:**

#### 1. **Scripts de Build Actualizados**
```json
{
  "build": "vite build"  // Removido: "tsc && vite build"
}
```

#### 2. **Archivos Convertidos (.ts → .js)**
- ✅ `src/components/app-index/app-index.ts` → `.js`
- ✅ `src/router/routes.ts` → `.js`  
- ✅ `src/pages/home/home-page.ts` → `.js`
- ✅ `src/services/http/*.ts` → `.js` (todos los servicios)

#### 3. **Dependencias Mantenidas** 🎯
```json
{
  "@material/web": "^2.3.0",
  "@open-cells/core": "^1.1.0",
  "@open-cells/element-controller": "^1.0.2", 
  "@open-cells/localize": "^1.1.1",
  "@open-cells/page-controller": "^1.0.2",
  "@open-cells/page-mixin": "^1.2.0",
  "@open-cells/page-transitions": "^1.0.1",
  "lit": "^3.0.0"
}
```

### 🏗️ **Arquitectura OpenCells Preservada**

- ✅ **Router**: Sistema de rutas con lazy loading
- ✅ **Navegación**: `PageMixin` y `navigate()` method  
- ✅ **Estados**: `ElementController` para publish/subscribe
- ✅ **i18n**: `LocalizeMixin` para internacionalización
- ✅ **Transiciones**: `PageTransitionsMixin` para animaciones
- ✅ **Configuración**: `startApp()` con appConfig

### 🎯 **Funcionalidades Completas**

| Característica | Estado | Descripción |
|---|---|---|
| 🏠 **Página Inicio** | ✅ | Cóctel aleatorio + categorías |
| 🍹 **Detalles** | ✅ | Ingredientes, instrucciones, favoritos |
| 📂 **Categorías** | ✅ | Navegación por tipo de bebida |
| ❤️ **Favoritos** | ✅ | Sistema persistente con localStorage |
| 🌍 **Multi-idioma** | ✅ | EN, ES, FR con LocalizeMixin |
| 🌙 **Modo Oscuro** | ✅ | Toggle tema claro/oscuro |
| 📱 **Responsive** | ✅ | Material Design Components |

### 🚀 **Comandos**

```bash
# Desarrollo
npm run dev

# Build (sin TypeScript)
npm run build  

# Preview
npm run preview
```

### 🔧 **Conversión Técnica**

**Antes (TypeScript):**
```typescript
@customElement('home-page')
export class HomePage extends PageMixin(LitElement) {
  @state()
  protected _cocktail: Cocktail | null = null;
  
  connectedCallback() {
    this.subscribe('data', (data: Cocktail) => {
      this._cocktail = data;
    });
  }
}
```

**Después (JavaScript):**
```javascript
@customElement('home-page')
export class HomePage extends PageMixin(LitElement) {
  constructor() {
    super();
    this._cocktail = null;
  }
  
  connectedCallback() {
    this.subscribe('data', (data) => {
      this._cocktail = data;
    });
  }
}
```

### 📡 **API TheCocktailDB**

- **Base URL**: `www.thecocktaildb.com/api/json/v1/1/`
- **Endpoints**: random, categories, lookup, filter, search
- **Configurado** mediante `appConfig` de OpenCells

### 🎨 **UI Components**

- **Material Web Components**: `@material/web`
- **Lit Elements**: Web components reactivos
- **OpenCells Mixins**: Funcionalidades avanzadas

---

## ✅ **Estado Actual**

✅ **Conversión Completada**  
✅ **Todas las funcionalidades operativas**  
✅ **OpenCells funcionando correctamente**  
✅ **Servidor de desarrollo ejecutándose**

El proyecto mantiene **toda su funcionalidad original** pero ahora está completamente en **JavaScript**, eliminando la necesidad de TypeScript mientras preserva todas las capacidades de OpenCells.