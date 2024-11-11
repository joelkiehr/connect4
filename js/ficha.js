class Ficha {
    constructor(posX, posY, radio, color, player, imagenSrc) {
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        this.color = color;
        this.player = player;
        this.usada = false;
        this.imagen = new Image();
        this.imagen.src = imagenSrc;
    }

    dibujar(ctx) {
        if (this.imagen.complete) {
            ctx.drawImage(this.imagen, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
        } else {
            this.imagen.onload = () => {
                ctx.drawImage(this.imagen, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
            };
        }
    }
    
    seleccionada(mouseX, mouseY) {
        const dx = mouseX - this.posX;
        const dy = mouseY - this.posY;
        return dx * dx + dy * dy <= this.radio * this.radio;
    }

    // Método para actualizar la posición del círculo
    mover(mouseX, mouseY) {
        this.posX = mouseX;
        this.posY = mouseY;
    }
}
