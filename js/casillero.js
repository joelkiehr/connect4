class Casillero {
    constructor(x, y, tamaño, imagenSrc) {
        this.x = x; // Posición X del casillero en el tablero
        this.y = y; // Posición Y del casillero en el tablero
        this.ficha = null; // Ficha colocada en este casillero (inicialmente vacío)
        this.tamaño = tamaño;
        this.imagenFondo = new Image();
        this.imagenFondo.src = "images/pared.jpg";
    }

    // Método para colocar una ficha en el casillero
    colocarFicha(ficha) {
        if (!this.ficha) {
            this.ficha = ficha;
        }
    }

    // Método para verificar si el casillero está vacío
    estaVacio() {
        return this.ficha === null;
    }

    vaciar() {
        this.ficha = null; // Restablecer la ficha a null para vaciar el casillero
    }

   
    dibujar(ctx, tamaño, inicioX, inicioY) {
        // Dibujar la imagen de fondo del casillero
        if (this.imagenFondo.complete) {
            ctx.drawImage(
                this.imagenFondo,
                inicioX + this.x * tamaño,
                inicioY + this.y * tamaño,
                tamaño,
                tamaño
            );
        } else {
            this.imagenFondo.onload = () => {
                ctx.drawImage(
                    this.imagenFondo,
                    inicioX + this.x * tamaño,
                    inicioY + this.y * tamaño,
                    tamaño,
                    tamaño
                );
            };
        }
    
        // Dibujar el contorno del casillero
        ctx.beginPath();
        ctx.rect(inicioX + this.x * tamaño, inicioY + this.y * tamaño, tamaño, tamaño);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    
        // Crear un círculo vacío en el centro del casillero
        ctx.save(); // Guardar el contexto actual
        ctx.globalCompositeOperation = 'destination-out'; // Cambiar la composición para hacer transparente
        ctx.beginPath();
        ctx.arc(
            inicioX + this.x * tamaño + tamaño / 2, // Centro X del círculo
            inicioY + this.y * tamaño + tamaño / 2, // Centro Y del círculo
            tamaño / 3, // Radio del círculo (ajusta según prefieras)
            0,
            2 * Math.PI
        );
        ctx.fill(); // Rellenar el círculo con transparencia
        ctx.restore(); // Restaurar la composición original
    
        // Dibujar la ficha si está presente
        if (this.ficha) {
            this.ficha.mover(inicioX + this.x * tamaño + tamaño / 2, inicioY + this.y * tamaño + tamaño / 2);
            this.ficha.dibujar(ctx);
        }
    }
    
    
}
