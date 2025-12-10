```
function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();
  const path = window.location.pathname;

  // 1. Mostrar loading mientras verifica autenticación
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 2. Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // 3. Usuario autenticado → mostrar app
  return (
    <>
      <Navbar />
      {path === "/favorites" ? <Favorites /> : <Home />}
    </>
  );
}
```

**Flujo de autenticación:**
```
1. App monta → AuthProvider ejecuta useEffect
2. useEffect hace fetch a /auth/check
3. Mientras espera → isLoading = true → muestra loading
4. Si respuesta OK → isAuthenticated = true → muestra app
5. Si respuesta error → isAuthenticated = false → muestra login
```

---

## 🎯 **EXPLICACIONES TÉCNICAS PARA DEFENDER**

### **1. ¿Por qué usas Context para autenticación?**
> "Uso Context API para evitar **prop drilling**. La autenticación es un estado que necesitan múltiples componentes (Navbar, Home, Favorites), y con Context puedo acceder a `isAuthenticated` y `logout` desde cualquier componente sin pasar props manualmente por cada nivel del árbol de componentes."

### **2. ¿Qué es `useState` y por qué lo usas?**
> "`useState` es un hook que crea **estado reactivo**. Cuando actualizo el estado con `setPhotos`, React detecta el cambio y re-renderiza automáticamente el componente con los nuevos datos. Esto es fundamental para actualizar la UI cuando llegan las fotos de la API."

### **3. ¿Qué hace `useEffect` en tu código?**
> "`useEffect` ejecuta código después del render. Lo uso principalmente para:
> - **Cargar datos al montar** (`loadPhotos()` en Home)
> - **Cargar favoritos del localStorage** (en Favorites)
> - **Verificar autenticación** (en AuthContext)
> 
> El array de dependencias `[]` significa que solo se ejecuta una vez al montar el componente."

### **4. ¿Cómo funciona el sistema de favoritos?**
> "Los favoritos se guardan en `localStorage` en dos estructuras:
> - `favorites`: Array de IDs (`["id1", "id2"]`)
> - `favoritesData`: Array de objetos completos de fotos
> 
> Cuando el usuario marca una foto como favorita:
> 1. Actualizo el estado con `setFavorites`
> 2. Guardo en localStorage
> 3. React re-renderiza mostrando la estrella llena (★)
> 
> En la página de Favorites, cargo `favoritesData` del localStorage al montar el componente."

### **5. ¿Cómo funciona la búsqueda?**
> "La búsqueda tiene dos modos:
> - **Sin query**: Llama a `/photos` para obtener fotos populares
> - **Con query**: Llama a `/photos/search?query=...`
> 
> Uso el estado `query` conectado al input, y cuando el usuario presiona Enter o el botón, ejecuto `search()` que actualiza el estado `photos` con los resultados."

### **6. ¿Por qué usas TypeScript?**
> "TypeScript añade **tipado estático** que previene errores. Por ejemplo:
> ```tsx
> interface PhotoModalProps {
>   photo: any;
>   isOpen: boolean;
>   onClose: () => void;
> }
> ```
> Esto asegura que `PhotoModal` reciba los props correctos y el IDE me avisa si me equivoco."

---

## 🔧 **FLUJO COMPLETO DE LA APLICACIÓN**

### **Flujo de Login:**
```
1. Usuario abre la app
2. AuthProvider verifica /auth/check
3. Si no autenticado → LoginPage
4. Usuario hace clic en "Login with Unsplash"
5. Redirige a backend/auth/login
6. Backend redirige a Unsplash OAuth
7. Usuario autoriza
8. Unsplash redirige a backend/auth/callback
9. Backend guarda access_token en cookie
10. Backend redirige al frontend
11. Frontend verifica /auth/check → ahora es true
12. Muestra la app
```

### **Flujo de Búsqueda:**
```
1. Usuario escribe en el input (actualiza state `query`)
2. Usuario presiona Enter o botón Search
3. Se ejecuta search()
4. setLoading(true) → muestra spinner
5. Fetch a backend/photos/search?query=...
6. Backend hace request a Unsplash con access_token
7. Backend devuelve resultados
8. setPhotos(results) → actualiza UI
9. setLoading(false) → oculta spinner
```

### **Flujo de Favoritos:**
```
1. Usuario hace clic en estrella
2. toggleFavorite(photo) se ejecuta
3. Actualiza arrays favorites y favoritesData
4. Guarda en localStorage
5. setFavorites() → React re-renderiza
6. Estrella cambia de ☆ a ★