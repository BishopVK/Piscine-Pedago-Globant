# 📝 FaQ
## Q: ¿Por qué no usas un router como React Router?

```
"Implementé un router simple basado en window.location.pathname porque el proyecto solo tiene 2 rutas. Para proyectos más grandes usaría React Router, pero aquí un router manual es suficiente y más ligero."
```

## Q: ¿Por qué guardas favoritos en localStorage y no en backend?

```
"Por simplicidad y rapidez. localStorage permite acceso instantáneo sin latencia de red. En producción, lo ideal sería sincronizar con backend para tener favoritos en múltiples dispositivos."
```

## Q: ¿Qué pasa si el usuario cierra la pestaña?

```
"La cookie de autenticación persiste (es httpOnly), así que al reabrir, AuthContext verifica /auth/check y mantiene la sesión. Los favoritos también persisten en localStorage."
```

## Q: ¿Cómo manejas los errores?

```
"Uso try/catch en las llamadas a la API y un estado error que muestra mensajes al usuario. También uso estados loading para indicar cuando hay operaciones en curso."
```


# 🚀 CONCEPTOS CLAVE RESUMIDOS
| Concepto   |      Qué es      |  Para qué sirve |
|----------|:-------------:|------:|
| useState |  Hook de estado | Crear variables reactivas que actualizan la UI |
| useEffect |    Hook de efectos   |   Ejecutar código después del render (fetch, localStorage, etc.) |
| Context | Estado global |    Compartir datos entre componentes sin prop drilling |
| useContext |  Hook para Context | Consumir el Context en cualquier componente |
| Props |    Parámetros de componentes   |   Pasar datos de padre a hijo |
| Children | Prop especial |    Renderizar componentes hijos dentro de un componente |