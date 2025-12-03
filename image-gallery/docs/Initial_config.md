# 1. PREPARACIÓN INICIAL

## 1.1. Crear cuenta y app en Unsplash
### Guardar:
- Access Key
- Secret Key
- Redirect URI --> http://localhost:5173/auth/callback

### En la cuenta de desarrollador de Unsplash:
- Create New Application → "Image Gallery"
- Añadir http://localhost:5173/auth/callback en "Redirect URIs"
- Poner http://localhost:5173 como origen permitido
- Guarda claves (NO subirlas al repo)

# 2. SETUP DEL PROYECTO

## 2.1. Crear proyecto React+TS+Vite
``` bash
npm create vite@latest image-gallery --template react-ts
cd image-gallery
npm install
```

## 2.2. Instalar TailwindCSS
``` bash
npm install -D tailwindcss @tailwindcss/vite
```

## 2.3. Configurar *vite.config.ts*
``` ts
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // plugin oficial Tailwind v4 para Vite
  ],
  server: {
    host: true, // permite --host 0.0.0.0 y accesos desde la red
    port: 5173,
  },
});
```

## 2.4. Añadir a *index.css*
``` css
@import "tailwindcss";
```

## 2.5. Añadir a *App.tsx*
Para comprobar que tailwind está instalado
``` HTML
<h1 className="text-4xl text-emerald-500 font-bold mt-5">
	Tailwind v4 funcionando 🚀
</h1>
```

## 2.6. Levantar el servidor
``` bash
npm run dev
```