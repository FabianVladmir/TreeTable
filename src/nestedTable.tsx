import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import './styleTable.css';
import { useEffect, useRef, useState } from 'react';

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

const transformRow = (row: any) => {
  const transformed = {
    funcion: getFuncionLabel(row),
    resultadoFuncion: computeResultadoFuncion(row)
  };
  
  const children = getSubRows(row);
  console.log("Children found:", children);
  if (children && Array.isArray(children)) {
    transformed.__children = children.map(transformRow);
  }
  return transformed;
};

const transformData = (data: any[]) => data.map(transformRow);


const ExampleComponent = () => {  

  // const hotTableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
  
        const data = await response.json();
  
        // Transforma los datos
        const transformed = transformData(data);
  
        // Almacena los datos transformados
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
  console.log(tableData)

  return (
    <HotTable
      
      className="ht-theme-main"
      data={tableData}
      preventOverflow="horizontal"
      rowHeaders={true}
      colHeaders={['Funcion', 'Resultado Funcion']}
      columns={[
        { data: 'funcion' },
        { 
          data: 'resultadoFuncion', 
          type: 'numeric', 
          numericFormat: { pattern: '0,0.00' } 
        }
      ]}
      nestedRows={true}
      contextMenu={true}
      bindRowsWithHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      autoColumnSize={true} 
      manualColumnResize={true}
      width="100%"          
      height="auto"
      licenseKey="non-commercial-and-evaluation"
      // columns={[
      //   { data: 'category', className: 'category-column' },
      //   { data: 'artist', className: 'artist-column' },
      //   { data: 'title', className: 'title-column' },
      //   { data: 'album', className: 'album-column' },
      //   { data: 'label', className: 'label-column' }
      // ]}
      // columns={[
      //   { data: 'category' },
      //   { data: 'artist' },
      //   { data: 'title' },
      //   { data: 'album' },
      //   { data: 'label' }
      // ]}
      
      
      
    />
  );
};

export default ExampleComponent;






// const sourceDataObject = [
//   {
//     category: 'Best Rock Performance',
//     artist: null,
//     title: null,
//     label: null,
//     __children: [
//       {
//         title: "Don't Wanna Fight",
//         artist: 'Alabama Shakes',
//         label: 'ATO Records',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//       {
//         title: 'What Kind Of Man',
//         artist: 'Florence & The Machine',
//         label: 'Republic',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Best Metal Performance',
//     __children: [
//       {
//         title: 'Cirice',
//         artist: 'Ghost',
//         label: 'Loma Vista Recordings',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//       {
//         title: 'Identity',
//         artist: 'August Burns Red',
//         label: 'Fearless Records',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Best Rock Song',
//     __children: [
//       {
//         title: "Don't Wanna Fight",
//         artist: 'Alabama Shakes',
//         label: 'ATO Records',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//       {
//         title: "Ex's & Oh's",
//         artist: 'Elle King',
//         label: 'RCA Records',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//     ],
//   },
//   {
//     category: 'Best Rock Album',
//     __children: [
//       {
//         title: 'Drones',
//         artist: 'Muse',
//         label: 'Warner Bros. Records',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//       {
//         title: 'Chaos And The Calm',
//         artist: 'James Bay',
//         label: 'Republic',
//         __children: [
//           { title: 'Track 1' },
//           { title: 'Track 2' },
//         ],
//       },
//     ],
//   },
// ];