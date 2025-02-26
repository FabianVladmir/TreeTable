import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import './styleTable.css';
import { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';

registerAllModules();

/*
 * Funcion recursiva
 * Lvl 2 (cuentas) = detalles.debito - detalles.credito
 * Lvl 0 y 1: suma resultado de los hijos 
 */
const computeResultadoFuncion = (row: any): number => {
  if (row.detalles) {
    return row.detalles.debito - row.detalles.credito;
  } else if (row.tiposDeGasto) {
    // Level 0 (tipoGasto)
    return row.tiposDeGasto.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    );
  } else if (row.cuentas) {
    // Level 1 (cuentas)
    return row.cuentas.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    );
  }
  return 0;
};

/* Obtiene el nombre de todos los centros de costos */
function gatherAllCostCenters(data: any[]): string[] {
  const costCenterSet = new Set<string>();

  function traverse(node: any) {
    // if (node.detalles && node.detalles.nombreCentroCostos) {
    //   costCenterSet.add(node.detalles.nombreCentroCostos);
    // }
    if (node.detalles?.nombreCentroCostos) {
      costCenterSet.add(node.detalles.nombreCentroCostos.trim());
    }

    if (node.tiposDeGasto) {
      node.tiposDeGasto.forEach(traverse);
    }
    if (node.cuentas) {
      node.cuentas.forEach(traverse);
    }    
  }

  data.forEach(traverse);
  return [...costCenterSet];
}

/**
 * Determina que etiqueta se mostrara":
 * Lvl 0: categoriaCuenta
 * Lvl 1: tipoGasto 
 * Lvl 2: nombreCuenta.
 */
const getFuncionLabel = (row: any): string => {
  if (row.categoriaCuenta) return row.categoriaCuenta;
  if (row.tipoGasto) return row.tipoGasto;
  if (row.nombreCuenta) return row.nombreCuenta;
  return '';
};

/**
 * Returns child rows:
 * Level 0 rows have children in "tiposDeGasto".
 * Level 1 rows have children in "cuentas".
 */
const getSubRows = (row: any): any[] | undefined => {
  if (row.tiposDeGasto) return row.tiposDeGasto;
  if (row.cuentas) return row.cuentas;
  return undefined;
};

// Transforma los datos

const transformRow = (  
  row: any,
  parentIndex = '',
  childIndex = 0
) => {
  let level = 0;
  if (row.tipoGasto) level = 1;
  if (row.nombreCuenta) level = 2;

  let myIndex = '';

  if (level === 1) {
    // lvl 1 segment0 => "64"
    const firstCuenta = row.cuentas?.[0];
    if (firstCuenta?.detalles?.segment0) {
      myIndex = firstCuenta.detalles.segment0.substring(0, 2);
    }
  } else if (level === 2) {
    // lvl 2 "64a", "64b", etc.
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    myIndex = parentIndex + letters[childIndex];
  }

  let dim1 = 'X';
  let dim2 = 'X';
  let dim3 = 'X';
  let dim4 = 'X';
  let fechaReferencia = 'X';
  let fechaVenc = 'X';
  let _centroCostos = '';

  if (row.detalles) {
    dim1 = row.detalles.dim1 || 'X';
    dim2 = row.detalles.dim2 || 'X';
    dim3 = row.detalles.dim3 || 'X';
    dim4 = row.detalles.dim4 || 'X';
    fechaReferencia = row.detalles.fechaReferencia || 'X';
    fechaVenc = row.detalles.fechaVenc || 'X';

    if(level === 2 && row.detalles.nombreCentroCostos){
      _centroCostos = row.detalles.nombreCentroCostos.trim();
    }
  }

  const transformed : any= {
    level,
    funcion: getFuncionLabel(row),
    resultadoFuncion: computeResultadoFuncion(row),
    myIndex,
    dim1,
    dim2,
    dim3,
    dim4,
    fechaReferencia,
    fechaVenc,
    _centroCostos,
  };
  
  const children = getSubRows(row);
  console.log("Children found:", children);
  if (children && Array.isArray(children)) {
    transformed.__children = children.map((child:any, idx: number) => {
      return transformRow(child, myIndex, idx)
    });
  }
  else {
    transformed.__children = [];
  }
  return transformed;
};

const transformData = (data: any[]) => data.map(transformRow);

function shortDateRenderer(
  instance: Handsontable.Core,
  td: HTMLTableCellElement,
  row: number,
  col: number,
  prop: string | number,
  value: any,
  cellProperties: Handsontable.CellProperties
) {
  let displayValue = 'X';  
  
  if (typeof value === 'string' && value.length >= 10) {
    displayValue = value.substring(2, 10); // "YY-MM-DD"
  }

  
  Handsontable.renderers.TextRenderer.apply(
    this, [instance, td, row, col, prop, displayValue, cellProperties]
  );
}


const ExampleComponent = () => {  

  // const hotTableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [costCenters, setCostCenters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hotTableRef = useRef<HotTable>(null);  
  

  useEffect(() => {
    if (!isLoading && hotTableRef.current && tableData.length) {
      const hot = hotTableRef.current.hotInstance;
      const nestedRowsPlugin = hot.getPlugin('nestedRows');
  
      // Check if the plugin is available
      if (nestedRowsPlugin?.collapsingUI?.toggleRowExpansion) {
        // Expand each top-level row
        tableData.forEach((row, rowIndex) => {
          if (row.__children && row.__children.length > 0) {
            nestedRowsPlugin.collapsingUI.toggleRowExpansion(rowIndex, true);
          }
        });
      }
    }
  }, [isLoading, tableData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
  
        const data = await response.json();
  
        const centers = gatherAllCostCenters(data);
        setCostCenters(centers);
        
        // Transforma los datos
        const transformed = transformData(data);        
        setTableData(transformed);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>Error: {error}</div>;
  // console.log(tableData)

  

  const baseColumnasHeaders = [
    'Funcion',
    'Resultado',
    'Dim1',
    'Dim2',
    'Dim3',
    'Dim4',
    'Fecha Ref',
    'Fecha Venc',
  ]

  const baseColumna = [
    { data: 'funcion' },
    {
      data: 'resultadoFuncion',
      type: 'numeric',
      numericFormat: { pattern: '0,0.00' },
    },
    { data: 'dim1' },
    { data: 'dim2' },
    { data: 'dim3' },
    { data: 'dim4' },
    {
      data: 'fechaReferencia',
      renderer: shortDateRenderer,
    },
    {
      data: 'fechaVenc',
      renderer: shortDateRenderer,
    },
  ]

  // Por cada centro de costos crea una columna y muestra $ si hay un valor o 'X'
  const costCenterColHeaders = costCenters.map((cc) => cc);

  
  const costCenterColumns = costCenters.map((cc) => ({
    data: (rowData: any) => {
      if (!rowData || typeof rowData.level === 'undefined') {
        return 'X'; // or blank
      }
      if (rowData.level === 2) {
        
        console.log('Comparing:', rowData._centroCostos, 'vs', cc);
        return rowData._centroCostos === cc ? '$' : 'X';
      }
      return 'X';
    },
  }));  

  console.log(costCenterColHeaders) // returned an array with 28 elements
  console.log(costCenterColumns) // returned an array empty 28 index

  // Combinacion
  const allColHeaders = [...baseColumnasHeaders, ...costCenterColHeaders];
  const allColumns = [...baseColumna, ...costCenterColumns];

  return (
    <HotTable
      ref={hotTableRef} 
      data={tableData}
      // stretchH='all'
      // colWidths={[3, 1, 1, 0.5, 1, 1, 1, 1]}
      nestedRows={true}
      colHeaders={
        allColHeaders
      }
      columns={
        allColumns
      }
      
      rowHeaders={(rowIndex: number) => {
        const hot = hotTableRef.current?.hotInstance;
        if (!hot) {
          
          return rowIndex + 1;
        }
        // Obtiene la fila 
        const rowData = hot.getSourceDataAtRow(rowIndex);

        // Si existe un indice personalizado (MyIndex) se muestra 
        if (rowData?.myIndex) {
          return rowData.myIndex;
        }
        return rowIndex + 1;
      }}

      cells={(row, col) => {
        const hot = hotTableRef.current?.hotInstance;
        if (!hot) return {};

        const rowData: any = hot.getSourceDataAtRow(row);

        if (!rowData || typeof rowData.level === 'undefined') {
          return {};
        }

        const cellProps: any = {};
        
        if (rowData.level === 0) {
          cellProps.className = 'level-0';
        } else if (rowData.level === 1) {
          cellProps.className = 'level-1';
        } 
        // else (level===2) => no style
        return cellProps;
      }}
      // Other standard settings
      contextMenu
      preventOverflow="horizontal"
      autoWrapRow
      autoWrapCol
      autoColumnSize
      manualColumnResize
      width="100%"
      height="auto"
      licenseKey="non-commercial-and-evaluation"
      className="ht-theme-main"
    />
  );

};

export default ExampleComponent;