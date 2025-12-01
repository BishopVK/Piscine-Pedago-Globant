# Cada movimento debe seguir siempre esta secuencia

1. **Copiar el estado actual (deep copy).**
2. **Transformar ese estado según la dirección.**
3. **Comparar estado anterior y estado nuevo.**
4. **Si es igual → no generar ficha nueva.**
5. **Si es distinto →**
6. **actualizar DOM**
7. **generar nueva ficha**
8. **aplicar colores**
9. **Fin del movimiento.**

## Ejemplo de lógica:
1. rotateBoard() → para evitar tener 4 versiones de movimientos. (girar la matriz y siemprer aplicar "hacia la izquierda", por ejemplo).
2. compress() → juntar números a la izquierda.
3. merge() → combinar pares iguales.
4. compress() otra vez.
5. compareStates()
6. printBoardToDOM()