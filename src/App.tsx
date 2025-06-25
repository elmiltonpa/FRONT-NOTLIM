import { useState } from 'react';
import './App.css'
import { Ejecutar } from './services';
import { ejemplosCodigo } from './examples';
import type { Ejemplo } from './examples';
import { useCodeMirror } from './hooks/useCodeMirror';


const validarFuncionesLectura = (codigo: string): { valido: boolean; error?: string } => {
  // Patrones que indican funciones de lectura (ajusta según tu sintaxis)
  const patronesLectura = [
    /leer\s*\(/i
  ];

  for (const patron of patronesLectura) {
    if (patron.test(codigo)) {
      return {
        valido: false,
        error: 'Las funciones de entrada de usuario no están disponibles en el intérprete web. Por favor, use valores constantes en su lugar.'
      };
    }
  }

  return { valido: true };
};

// Componentes de iconos SVG
const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const FileTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export interface ResultadoEjecucion {
  exito: boolean;
  error?: string;
  salida?: string[];
}

export default function App() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState<ResultadoEjecucion | null>(null);
  const [ejecutando, setEjecutando] = useState(false);
  const [ejemplos] = useState<Ejemplo[]>(ejemplosCodigo);

  const ref = useCodeMirror({ value: codigo, onChange: setCodigo });

  const ejecutarCodigo = async () => {
    if (!codigo.trim()) {
      setResultado({
        exito: false,
        error: 'Por favor ingresa código para ejecutar',
        salida: []
      });
      return;
    }

    const validacion = validarFuncionesLectura(codigo);
    if (!validacion.valido) {
      setResultado({
        exito: false,
        error: validacion.error,
        salida: []
      });
      return;
    }

    setEjecutando(true);
    setResultado(null);

    setTimeout(async () => {
      try {

        const resultado = await Ejecutar(codigo);

        setResultado(resultado);
      } catch (error) {
        setResultado({
          exito: false,
          error: `Error inesperado: ${error}`,
          salida: []
        });
      } finally {
        setEjecutando(false);
      }
    }, 500);
  };

  const limpiarEditor = () => {
    setCodigo('');
    setResultado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Intérprete de Lenguaje
          </h1>
          <p className="text-gray-600">
            Escribe y ejecuta programas en tu lenguaje personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor de código */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FileTextIcon />
                  <span className="ml-2">Editor de Código</span>
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={limpiarEditor}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center"
                  >
                    <TrashIcon />
                    <span className="ml-1">Limpiar</span>
                  </button>
                  <button
                    onClick={ejecutarCodigo}
                    disabled={ejecutando}
                    className={`px-4 py-2 text-sm font-medium rounded transition-colors flex items-center ${
                      ejecutando
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <PlayIcon />
                    <span className="ml-1">{ejecutando ? 'Ejecutando...' : 'Ejecutar'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              ref={ref}
              className="border border-gray-300"
              style={{
                minHeight: "200px",
                width: "100%",
                textAlign: "left",
                overflow: "auto",
                fontFamily: "monospace",
                fontSize: "14px"
              }} >
            </div>

            {/* Ejemplos */}
            <div className="border-t border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Ejemplos:</h3>
              <div className="flex flex-wrap gap-2">
                {ejemplos.map((ejemplo, index) => (
                  <button
                    key={index}
                    onClick={() => setCodigo(ejemplo.codigo)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    {ejemplo.nombre}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Resultados de Ejecución
              </h2>
            </div>

            <div className="p-4">
              {ejecutando && (
                <div className="flex items-center justify-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-gray-600">Ejecutando...</span>
                </div>
              )}

              {resultado && !ejecutando && (
                <div className="space-y-4">
                  {/* Estado de ejecución */}
                  <div className={`flex items-center p-3 rounded-md ${
                    resultado.exito 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {resultado.exito ? (
                      <CheckCircleIcon />
                    ) : (
                      <AlertCircleIcon />
                    )}
                    <span className="font-medium ml-2">
                      {resultado.exito ? 'Ejecución exitosa' : 'Error de ejecución'}
                    </span>
                  </div>

                  {/* Error */}
                  {resultado.error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <h4 className="font-medium text-red-800 mb-1">Error:</h4>
                      <pre className="text-sm text-red-700 whitespace-pre-wrap">
                        {resultado.error}
                      </pre>
                    </div>
                  )}

                  {/* Salida */}
                  {resultado.salida && resultado.salida.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
                      <h4 className="font-medium text-gray-800 mb-2">Salida:</h4>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {resultado.salida.join('\n')}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {!resultado && !ejecutando && (
                <div className="text-center py-8 text-gray-500">
                  <div className="w-12 h-12 mx-auto mb-3 opacity-50">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p>Escribe código y presiona "Ejecutar" para ver los resultados</p>
                  
                  {/* Advertencia sobre el servidor */}
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Nota importante:</p>
                        <p>La primera ejecución puede tardar unos segundos ya que el servidor se "duerme" después de 15 minutos de inactividad.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
