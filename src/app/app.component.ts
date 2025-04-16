import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Calculadora estilo Windows';
  display: string = ''; // Pantalla de la calculadora
  operador: string = ''; // Operador actual
  numero1: number | null = null; // Primer número
  numero2: number | null = null; // Segundo número
  resultadoMostrado: boolean = false; // Para manejar si ya se mostró un resultado

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKey.bind(this));
  }

  // Función para agregar números al display
  agregarNumero(valor: string): void {
    if (this.resultadoMostrado) {
      this.display = ''; // Si ya se mostró un resultado, reinicia la pantalla
      this.resultadoMostrado = false;
    }
    this.display += valor;
  }

  // Función para seleccionar el operador
  seleccionarOperacion(op: string): void {
    if (this.display === '') return;

    this.numero1 = parseFloat(this.display); // Guardar el primer número
    this.operador = op;
    this.display = ''; // Limpiar pantalla para el segundo número
  }

  // Función para calcular el resultado
  calcular(): void {
    if (this.numero1 === null || this.display === '') return;

    this.numero2 = parseFloat(this.display);
    let resultado = 0;

    switch (this.operador) {
      case '+':
        resultado = this.numero1 + this.numero2;
        break;
      case '-':
        resultado = this.numero1 - this.numero2;
        break;
      case '*':
        resultado = this.numero1 * this.numero2;
        break;
      case '/':
        resultado = this.numero2 !== 0 ? this.numero1 / this.numero2 : NaN;
        break;
    }

    // Mostrar el resultado en el display, con un máximo de 6 decimales
    this.display = isNaN(resultado)
      ? 'Error'
      : parseFloat(resultado.toFixed(6)).toString();

    this.numero1 = null;
    this.numero2 = null;
    this.operador = '';
    this.resultadoMostrado = true;
  }

  // Función para borrar todo (Resetear la calculadora)
  borrar(): void {
    this.display = '';
    this.numero1 = null;
    this.numero2 = null;
    this.operador = '';
    this.resultadoMostrado = false;
  }

  // Función para calcular el porcentaje
  calcularPorcentaje(): void {
    if (this.display === '') return;

    let porcentaje = parseFloat(this.display);
    if (this.numero1 !== null) {
      // Calcula el porcentaje de numero1 respecto al valor en display
      this.display = (this.numero1 * porcentaje / 100).toFixed(6);
    } else {
      // Si solo hay un número, calcula el porcentaje de ese número
      this.display = (porcentaje / 100).toFixed(6);
    }

    this.resultadoMostrado = true;
  }

  // Función para limpiar la pantalla (no resetea el estado completo)
  limpiar(): void {
    this.display = '';
  }

  // Función para eliminar el último número (Backspace)
  eliminar(): void {
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1); // Eliminar el último carácter
    } else {
      this.display = ''; // Si solo hay un carácter, vaciar el display
    }
  }

  // Manejo de eventos de teclado
  handleKey(event: KeyboardEvent): void {
    const key = event.key;

    if (!isNaN(Number(key))) {
      this.agregarNumero(key); // Si la tecla es un número
    } else if (key === '+') {
      this.seleccionarOperacion('+');
    } else if (key === '-') {
      this.seleccionarOperacion('-');
    } else if (key === '*' || key === 'x') {
      this.seleccionarOperacion('*');
    } else if (key === '/') {
      this.seleccionarOperacion('/');
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      this.calcular();
    } else if (key === 'c' || key === 'C') {
      this.borrar();
    } else if (key === '.') {
      this.agregarNumero('.');
    } else if (key === 'Backspace') {
      this.eliminar();
    }
  }
}
