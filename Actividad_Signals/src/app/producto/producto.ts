import { Component } from '@angular/core';
import{ signal, computed, effect} from '@angular/core';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})


// @ Angular solo rastrea signals , effect o computed signals que se estan "leyendo"
export class Producto {

  //Existen dos tipos de signals:
  //1. Writable signals: No dependen de otros signals. Ademas pueden recibir e insertar un nuevo valor
  cantidad = signal(1);
  precio = signal(100);
  id = signal(0);

//2. Computed Signals: Si depende de otros signals. Solo pueden recibir nuevos valores
//Expresión con señales:
  total = computed( () => {return this.precio() * this.cantidad()});


  //Otra Caracteristica propia de los signals son los effects:
  // Con el effect es posible leer varios signals a la vez de una sola pasada, es decir una vez pulsamos en el boton + o -,
  // una vez realizada la pulsación se ejecutan los 3 gets en paralelo de los 3 signals que hay dentro y nos devuelven sus valores al instante.
  constructor(){
    effect(() => {
        console.log(' First Effect ');
        console.log('cantidad: ' + this.cantidad());
        console.log('total: ' + this.total());
        console.log('id: ' + this.id());
    });

    //Ademas es posible generar mas de un effect:
    effect(() => {
      console.log(' Second Effect ');
      console.log( 'id: ' + this.id());

      // # IMPORTANTE: no se puede modificar el valor de un signal dentro de un Effect:
      // this.id.set(5) X

      //Si fuera necesario realizar una modificación de un signal dentro de un effect seria necesario hacerlo asi:
      this.id.set(1000);
    }, {allowSignalWrites: true});

  }

  // # Otra forma de crear un effect seria generando una clase:
  private logTotal = effect( () => {
    console.log('Total: ' + this.total());
  })




  aumentar(){
    //Soportan otro metodo adicionales como por ejemplo (.update)
    this.cantidad.update(value => value +1);

    //Generamos un id aleatorio:
    this.id.set(Math.random());
  }

  reducir(){
    this.cantidad.set(this.cantidad()-1)

  }


}


