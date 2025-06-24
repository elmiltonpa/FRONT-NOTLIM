// Definir la interfaz para los ejemplos
export interface Ejemplo {
  nombre: string;
  codigo: string;
  descripcion?: string;
}

// Array con todos los ejemplos (hardcodeados)
export const ejemplosCodigo: Ejemplo[] = [
  {
    nombre: 'SEL - Sistema de Ecuaciones Lineales',
    codigo: `program SEL;
	def A:matriz[2][3];
	x:matriz[2][1];
	factor:real;
	suma:real;
	temp:real;
	i:real;
	j:real;
	k:real;
	n:real;
	pivote:real;

{

	A := [[2,3,6],[2,-5,10]];

	n:=2;
	i := 1;
	while ( ? i <= (n - 1) ? ) {
		if ( ? A[i][i] == 0 ? ) { 
			k := i + 1 ;
			pivote:= 0;
			while ( ? k <= n ? && ? pivote == 0 ? ) {
				if ( ? A[k][i] != 0 ? ) {
					j:=1 ;
					while ( ? j <= (n + 1) ? ) {
						temp := A[i][j];
						A[i][j] := A[k][j];
						A[k][j] := temp ;
						j := j + 1;
					};
				pivote:=1;	
					
				};
				k := k + 1;
			};	
		
		};
		k := i + 1 ;
		while ( ? k <= n ?) { 
			factor := A[k][i] / A[i][i];
			j:=i;
			while ( ? j <= (n + 1) ? ) {
				A[k][j] := A[k][j] - (factor * A[i][j]);
				j:=j + 1 ;
			};
			k:= k + 1 ;

		};
		i := i + 1;
	};

	i := n;
	while ( ? i >= 1 ? ) {
		suma := 0;
		j := i + 1 ;
		while ( ? j <= n ? ) {
			suma := suma + (A[i][j] * x[j][1]);
			j:=j + 1 ;
		
		};
		if (? A[i][i] == 0 ? ) {
			escribir('SISTEMA SIN SOLUCION O CON INFINITAS SOLUCIONES');
		};
		x[i][1] := ( A[i][n+1] - suma ) / A[i][i];
		i := i - 1;
	};

	i:=1;
	while ( ? i <= n ?) {
		escribir('Solucion ',i , ' : ' , x[i][1]);
		i:= i  + 1 ;

	};
}
`,
    descripcion: 'Implementación del método de eliminación gaussiana para resolver sistemas de ecuaciones lineales'
  },
  {
    nombre: 'Programa de Presentación',
    codigo: `program presentacion;
	def A:matriz[3][2];B:matriz[3][2];i:real;j:real;sum:real;aux:real;
{
	A := [[3,4],[1,2],[4,7]];

	i := 1;	

	while ( ? i <= filas(A) ?) {
		j:=1;
		while ( ? j <= columnas(A) ?) {
			aux := A[i][j];
			sum := 0;
			while ( ? aux > 0 ? ) {
				sum := sum + aux;
				aux := aux - 1 ;
			};

			B[i][j] := sum;
			j := j + 1 ;
		};
		i := i+1;
	};

	escribir(B);
	
}`,
    descripcion: 'Ejemplo básico de manipulación de matrices y bucles'
  },
  {
    nombre: 'Normalización',
    codigo: `program Normalizacion;
	def A:matriz[3][2];i:real;j:real;fila:real;columna:real;min:real;max:real;rango:real;aux:real;

{
	fila:=filas(A);
	columna:=columnas(A);

	A := [[5,1],[5,3],[5,7]];
	j:=1;
	
	while ( ? j <= columna ? ) {
		min := A[1][j];
		max := A[1][j];
		
		i:=2;
		
		while ( ? i <= fila ? ) {
			if ( ? A[i][j] < min ? ) {
				min:= A[i][j];
			};
			
			if ( ? A[i][j] > max ? ) {
				max := A[i][j];
			};
			
			i := (i + 1);
			
		};
		rango := (max - min);
		if ( ? rango == 0 ? ) {
			rango := 1;
		};

		i := 1;
		while ( ? i <= fila ? ) {
			aux:= A[i][j];
			A[i][j] := ((aux - min) / rango);
			i := (i + 1);
		};
		j := (j + 1);
	
	};

	escribir(A);
	

}`,
    descripcion: 'Proceso de normalización de datos'
  },
  {
    nombre: 'Selección',
    codigo: `program seleccion;
	def A:matriz[1][6];i:real;j:real;temp:real;
{
	
	A := [[3,1,-4,-55.55,3]];

	i:=1;

	while (? i <= (columnas(A) - 1) ? ) {
		j:=1;
		while (? j <= (columnas(A) - i) ? ) {
			if ( ? A[1][j] > A[1][j+1] ? ){
				temp := A[1][j];
				A[1][j]:=A[1][j+1];
				A[1][j+1] := temp;

			};
			j := j+1;


		};
		i:= i +1;

	};
	escribir(A);
}`,
    descripcion: 'Algoritmo de ordenamiento por selección'
  },
  {
    nombre: 'Test Bucle Infinito',
    codigo: `program test;
def
  x: real;
  i: real;
{
  x := 5;
  i := 0;
  while (? i < 10 ?) {
    i := i + 1;
    x := x * 2;
  };
  escribir('Valor final de x: ', x);
}`,
    descripcion: 'Ejemplo para probar el control de bucles infinitos'
  }
];

export default ejemplosCodigo; 