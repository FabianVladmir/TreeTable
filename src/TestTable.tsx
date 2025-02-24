import React from 'react';


interface Detalles {
  debito: number;
  credito: number;  
}

interface Cuenta {
  nombreCuenta: string;
  detalles: Detalles;
}

interface TipoGasto {
  tipoGasto: string;
  cuentas: Cuenta[];
}

interface CategoriaCuenta {
  categoriaCuenta: string;
  tiposDeGasto: TipoGasto[];
}


const computeResultadoFuncion = (row: any): number => {
  if (row.detalles) {
    return row.detalles.debito - row.detalles.credito;
  } else if (row.tiposDeGasto) {
    
    return row.tiposDeGasto.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    );
  } else if (row.cuentas) {
    
    return row.cuentas.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    );
  }
  return 0;
};


const getFuncionLabel = (row: any): string => {
  if (row.categoriaCuenta) return row.categoriaCuenta;
  if (row.tipoGasto) return row.tipoGasto;
  if (row.nombreCuenta) return row.nombreCuenta;
  return '';
};

const getSubRows = (row: any): any[] | undefined => {
  if (row.tiposDeGasto) return row.tiposDeGasto;
  if (row.cuentas) return row.cuentas;
  return undefined;
};


const TestFunctions: React.FC = () => {
  
  const sampleData: CategoriaCuenta = {
    categoriaCuenta: "Test Categoria (Level 0)",
    tiposDeGasto: [
      {
        tipoGasto: "Test Tipo Gasto (Level 1)",
        cuentas: [
          {
            nombreCuenta: "Test Cuenta 1 (Level 2)",
            detalles: { debito: 100, credito: 50 }
          },
          {
            nombreCuenta: "Test Cuenta 2 (Level 2)",
            detalles: { debito: 60, credito: 20 }  
          }
        ]
      }
    ]
  };

  // Level 0 (CategoriaCuenta) tests:
  const level0Resultado = computeResultadoFuncion(sampleData);
  const level0Label = getFuncionLabel(sampleData);
  const level0SubRows = getSubRows(sampleData);

  // Level 1 (TipoGasto) tests:
  const sampleTipo = sampleData.tiposDeGasto[0];
  const level1Resultado = computeResultadoFuncion(sampleTipo);
  const level1Label = getFuncionLabel(sampleTipo);
  const level1SubRows = getSubRows(sampleTipo);

  // Level 2 (Cuenta) tests:
  const sampleCuenta = sampleTipo.cuentas[0];
  const level2Resultado = computeResultadoFuncion(sampleCuenta);
  const level2Label = getFuncionLabel(sampleCuenta);
  const level2SubRows = getSubRows(sampleCuenta);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Test Results for Helper Functions</h2>

      <div style={{ marginBottom: '1rem' }}>
        <h3>Level 0 (categoriaCuenta)</h3>
        <p>
          <strong>Label:</strong> {level0Label}
        </p>
        <p>
          <strong>Resultado Funcion:</strong> {level0Resultado}
        </p>
        <p>
          <strong>SubRows:</strong>{" "}
          {level0SubRows ? JSON.stringify(level0SubRows, null, 2) : "None"}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3>Level 1 (tipoGasto)</h3>
        <p>
          <strong>Label:</strong> {level1Label}
        </p>
        <p>
          <strong>Resultado Funcion:</strong> {level1Resultado}
        </p>
        <p>
          <strong>SubRows:</strong>{" "}
          {level1SubRows ? JSON.stringify(level1SubRows, null, 2) : "None"}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <h3>Level 2 (nombreCuenta)</h3>
        <p>
          <strong>Label:</strong> {level2Label}
        </p>
        <p>
          <strong>Resultado Funcion:</strong> {level2Resultado}
        </p>
        <p>
          <strong>SubRows:</strong>{" "}
          {level2SubRows ? JSON.stringify(level2SubRows, null, 2) : "None"}
        </p>
      </div>
    </div>
  );
};

export default TestFunctions;
