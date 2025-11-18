import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class BotoneraService {

    getBotonera(numPag: number, numPages: number, neighborhood: number): string[] {
        // el usuario siempre espera que las páginas sean 1-based (la primera un uno)
        // sin embargo, el backend trabaja con páginas 0-based (la primera es la 0)
        let botonera: string[] = [];
        let paginaActual = numPag + 1;

        for (let i = 1; i <= numPages; i++) {
            if (i == 1) { // primera
                botonera.push('1');
            } else if (i == paginaActual) { // actual
                botonera.push(i.toString())
            } else if (i == numPages) { // última
                botonera.push(i.toString())
            } else if (i >= paginaActual - neighborhood && i < paginaActual) { //vecindad por abajo
                botonera.push(i.toString())
            } else if (i <= paginaActual + neighborhood && i > paginaActual) { //vecindad por arriba
                botonera.push(i.toString())
            } else if (i == paginaActual - neighborhood - 1) { // abreviación de paginas por abajo
                botonera.push('...')
            } else if (i == paginaActual + neighborhood + 1) { // abreviación de paginas por arriba
                botonera.push('...')
            }
        }
        return botonera;
    }

}


