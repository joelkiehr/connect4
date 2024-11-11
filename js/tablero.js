class Tablero {
    constructor(filas, columnas, tamañoCasillero) {
        this.filas = filas;
        this.columnas = columnas;
        this.tamañoCasillero = tamañoCasillero;
        this.casilleros = this.crearCasilleros();
      
    }

   

    crearCasilleros() {
        const matriz = [];
        for (let i = 0; i < this.filas; i++) {
            const fila = [];
            for (let j = 0; j < this.columnas; j++) {
                fila.push(new Casillero(j, i));
            }
            matriz.push(fila);
        }
        return matriz;
    }

    
        colocarFichaEnColumna(columna, ficha) {
            for (let i = this.filas - 1; i >= 0; i--) {
                if (this.casilleros[i][columna].estaVacio()) {
                    // Coloca la ficha en el casillero
                    this.casilleros[i][columna].colocarFicha(ficha);
        
                    // Actualiza las coordenadas de la ficha al centro del casillero
                    ficha.posX = (columna + 0.5) * this.tamañoCasillero;
                    ficha.posY = (i + 0.5) * this.tamañoCasillero;
        
                    return true;
                }
            }
            return false;
        }
        
    

        dibujar(ctx) {
                this.casilleros.forEach((fila, i) => {
                    fila.forEach((casillero, j) => {
                        casillero.dibujar(ctx, this.tamañoCasillero, inicioXTablero, inicioYTablero);
                    });
                });
              
        }


        
    imprimirMatriz() {
        console.clear(); // Limpiar la consola cada vez que se imprima
        for (let i = 0; i < this.filas; i++) {
            let fila = "";
            for (let j = 0; j < this.columnas; j++) {
                fila += this.casilleros[i][j].ficha ? this.casilleros[i][j].ficha.color[0].toUpperCase() + " " : ". ";
            }
            console.log(fila);
        }
        console.log("\n"); // Espacio entre impresiones
    }
    
    
    // Función que cuenta las fichas consecutivas en una dirección
    verificar(row, col, ficha) {
        if (this.checkDirection(row, col, 0, 1, ficha) >= 4 || // Horizontal
            this.checkDirection(row, col, 1, 0, ficha) >= 4 || // Vertical
            this.checkDirection(row, col, 1, 1, ficha) >= 4 || // Diagonal descendente
            this.checkDirection(row, col, 1, -1, ficha) >= 4) { // Diagonal ascendente
            console.log("¡Hay 4 en línea!");
            return true;
        }
    }

    // Función que cuenta las fichas consecutivas en una dirección
    checkDirection(row, col, rowIncrement, colIncrement, ficha) {
        let count = 1; // Contar la ficha actual
        let i;

        // Revisar hacia adelante (incremento positivo)
        for (i = 1; i < 4; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;
            if (newRow < 0 || newRow >= this.filas || newCol < 0 || newCol >= this.columnas ||
                !this.casilleros[newRow][newCol].ficha || 
                this.casilleros[newRow][newCol].ficha.color !== ficha.color) {
                break;
            }
            count++;
        }

        // Revisar hacia atrás (incremento negativo)
        for (i = 1; i < 4; i++) {
            const newRow = row - i * rowIncrement;
            const newCol = col - i * colIncrement;
            if (newRow < 0 || newRow >= this.filas || newCol < 0 || newCol >= this.columnas ||
                !this.casilleros[newRow][newCol].ficha || 
                this.casilleros[newRow][newCol].ficha.color !== ficha.color) {
                break;
            }
            count++;
        }

        return count;
    }



    limpiarTablero() {
        for (let fila of this.casilleros) {
            for (let casillero of fila) {
                casillero.vaciar(); // Suponiendo que tienes un método `vaciar` en cada casillero
            }
        }
    }
}








