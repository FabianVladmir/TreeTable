// // // import React, { HTMLProps } from 'react'
// // // import ReactDOM from 'react-dom/client'

// // // import './index.css'

// // // import {
// // //   Column,
// // //   Table,
// // //   ExpandedState,
// // //   useReactTable,
// // //   getCoreRowModel,
// // //   getPaginationRowModel,
// // //   getFilteredRowModel,
// // //   getExpandedRowModel,
// // //   ColumnDef,
// // //   flexRender,
// // // } from '@tanstack/react-table'
// // // import { makeData, Person } from './makeData'

// // // function MyTable() {
// // //   const rerender = React.useReducer(() => ({}), {})[1]

// // //   const columns = React.useMemo<ColumnDef<Person>[]>(
// // //     () => [
// // //       {
// // //         accessorKey: 'firstName',
// // //         header: ({ table }) => (
// // //           <>
// // //             <IndeterminateCheckbox
// // //               {...{
// // //                 checked: table.getIsAllRowsSelected(),
// // //                 indeterminate: table.getIsSomeRowsSelected(),
// // //                 onChange: table.getToggleAllRowsSelectedHandler(),
// // //               }}
// // //             />{' '}
// // //             <button
// // //               {...{
// // //                 onClick: table.getToggleAllRowsExpandedHandler(),
// // //               }}
// // //             >
// // //               {table.getIsAllRowsExpanded() ? '👇' : '👉'}
// // //             </button>{' '}
// // //             First Name
// // //           </>
// // //         ),
// // //         cell: ({ row, getValue }) => (
// // //           <div
// // //             style={{
// // //               // Since rows are flattened by default,
// // //               // we can use the row.depth property
// // //               // and paddingLeft to visually indicate the depth
// // //               // of the row
// // //               paddingLeft: `${row.depth * 2}rem`,
// // //             }}
// // //           >
// // //             <div>
// // //               <IndeterminateCheckbox
// // //                 {...{
// // //                   checked: row.getIsSelected(),
// // //                   indeterminate: row.getIsSomeSelected(),
// // //                   onChange: row.getToggleSelectedHandler(),
// // //                 }}
// // //               />{' '}
// // //               {row.getCanExpand() ? (
// // //                 <button
// // //                   {...{
// // //                     onClick: row.getToggleExpandedHandler(),
// // //                     style: { cursor: 'pointer' },
// // //                   }}
// // //                 >
// // //                   {row.getIsExpanded() ? '👇' : '👉'}
// // //                 </button>
// // //               ) : (
// // //                 '🔵'
// // //               )}{' '}
// // //               {getValue<boolean>()}
// // //             </div>
// // //           </div>
// // //         ),
// // //         footer: props => props.column.id,
// // //       },
// // //       {
// // //         accessorFn: row => row.lastName,
// // //         id: 'lastName',
// // //         cell: info => info.getValue(),
// // //         header: () => <span>Last Name</span>,
// // //         footer: props => props.column.id,
// // //       },
// // //       {
// // //         accessorKey: 'age',
// // //         header: () => 'Age',
// // //         footer: props => props.column.id,
// // //       },
// // //       {
// // //         accessorKey: 'visits',
// // //         header: () => <span>Visits</span>,
// // //         footer: props => props.column.id,
// // //       },
// // //       {
// // //         accessorKey: 'status',
// // //         header: 'Status',
// // //         footer: props => props.column.id,
// // //       },
// // //       {
// // //         accessorKey: 'progress',
// // //         header: 'Profile Progress',
// // //         footer: props => props.column.id,
// // //       },
// // //     ],
// // //     []
// // //   )

// // //   const [data, setData] = React.useState(() => makeData(100, 5, 3))
// // //   const refreshData = () => setData(() => makeData(100, 5, 3))

// // //   const [expanded, setExpanded] = React.useState<ExpandedState>({})

// // //   const table = useReactTable({
// // //     data,
// // //     columns,
// // //     state: {
// // //       expanded,
// // //     },
// // //     onExpandedChange: setExpanded,
// // //     getSubRows: row => row.subRows,
// // //     getCoreRowModel: getCoreRowModel(),
// // //     getPaginationRowModel: getPaginationRowModel(),
// // //     getFilteredRowModel: getFilteredRowModel(),
// // //     getExpandedRowModel: getExpandedRowModel(),
// // //     // filterFromLeafRows: true,
// // //     // maxLeafRowFilterDepth: 0,
// // //     debugTable: true,
// // //   })

// // //   return (
// // //     <div className="p-2">
// // //       <div className="h-2" />
// // //       <table>
// // //         <thead>
// // //           {table.getHeaderGroups().map(headerGroup => (
// // //             <tr key={headerGroup.id}>
// // //               {headerGroup.headers.map(header => {
// // //                 return (
// // //                   <th key={header.id} colSpan={header.colSpan}>
// // //                     {header.isPlaceholder ? null : (
// // //                       <div>
// // //                         {flexRender(
// // //                           header.column.columnDef.header,
// // //                           header.getContext()
// // //                         )}
// // //                         {header.column.getCanFilter() ? (
// // //                           <div>
// // //                             <Filter column={header.column} table={table} />
// // //                           </div>
// // //                         ) : null}
// // //                       </div>
// // //                     )}
// // //                   </th>
// // //                 )
// // //               })}
// // //             </tr>
// // //           ))}
// // //         </thead>
// // //         <tbody>
// // //           {table.getRowModel().rows.map(row => {
// // //             return (
// // //               <tr key={row.id}>
// // //                 {row.getVisibleCells().map(cell => {
// // //                   return (
// // //                     <td key={cell.id}>
// // //                       {flexRender(
// // //                         cell.column.columnDef.cell,
// // //                         cell.getContext()
// // //                       )}
// // //                     </td>
// // //                   )
// // //                 })}
// // //               </tr>
// // //             )
// // //           })}
// // //         </tbody>
// // //       </table>
// // //       <div className="h-2" />
// // //       <div className="flex items-center gap-2">
// // //         <button
// // //           className="border rounded p-1"
// // //           onClick={() => table.setPageIndex(0)}
// // //           disabled={!table.getCanPreviousPage()}
// // //         >
// // //           {'<<'}
// // //         </button>
// // //         <button
// // //           className="border rounded p-1"
// // //           onClick={() => table.previousPage()}
// // //           disabled={!table.getCanPreviousPage()}
// // //         >
// // //           {'<'}
// // //         </button>
// // //         <button
// // //           className="border rounded p-1"
// // //           onClick={() => table.nextPage()}
// // //           disabled={!table.getCanNextPage()}
// // //         >
// // //           {'>'}
// // //         </button>
// // //         <button
// // //           className="border rounded p-1"
// // //           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// // //           disabled={!table.getCanNextPage()}
// // //         >
// // //           {'>>'}
// // //         </button>
// // //         <span className="flex items-center gap-1">
// // //           <div>Page</div>
// // //           <strong>
// // //             {table.getState().pagination.pageIndex + 1} of{' '}
// // //             {table.getPageCount()}
// // //           </strong>
// // //         </span>
// // //         <span className="flex items-center gap-1">
// // //           | Go to page:
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             max={table.getPageCount()}
// // //             defaultValue={table.getState().pagination.pageIndex + 1}
// // //             onChange={e => {
// // //               const page = e.target.value ? Number(e.target.value) - 1 : 0
// // //               table.setPageIndex(page)
// // //             }}
// // //             className="border p-1 rounded w-16"
// // //           />
// // //         </span>
// // //         <select
// // //           value={table.getState().pagination.pageSize}
// // //           onChange={e => {
// // //             table.setPageSize(Number(e.target.value))
// // //           }}
// // //         >
// // //           {[10, 20, 30, 40, 50].map(pageSize => (
// // //             <option key={pageSize} value={pageSize}>
// // //               Show {pageSize}
// // //             </option>
// // //           ))}
// // //         </select>
// // //       </div>
// // //       <div>{table.getRowModel().rows.length} Rows</div>
// // //       <div>
// // //         <button onClick={() => rerender()}>Force Rerender</button>
// // //       </div>
// // //       <div>
// // //         <button onClick={() => refreshData()}>Refresh Data</button>
// // //       </div>
// // //       <label>Expanded State:</label>
// // //       <pre>{JSON.stringify(expanded, null, 2)}</pre>
// // //       <label>Row Selection State:</label>
// // //       <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
// // //     </div>
// // //   )
// // // }

// // // function Filter({
// // //   column,
// // //   table,
// // // }: {
// // //   column: Column<any, any>
// // //   table: Table<any>
// // // }) {
// // //   const firstValue = table
// // //     .getPreFilteredRowModel()
// // //     .flatRows[0]?.getValue(column.id)

// // //   const columnFilterValue = column.getFilterValue()

// // //   return typeof firstValue === 'number' ? (
// // //     <div className="flex space-x-2">
// // //       <input
// // //         type="number"
// // //         value={(columnFilterValue as [number, number])?.[0] ?? ''}
// // //         onChange={e =>
// // //           column.setFilterValue((old: [number, number]) => [
// // //             e.target.value,
// // //             old?.[1],
// // //           ])
// // //         }
// // //         placeholder={`Min`}
// // //         className="w-24 border shadow rounded"
// // //       />
// // //       <input
// // //         type="number"
// // //         value={(columnFilterValue as [number, number])?.[1] ?? ''}
// // //         onChange={e =>
// // //           column.setFilterValue((old: [number, number]) => [
// // //             old?.[0],
// // //             e.target.value,
// // //           ])
// // //         }
// // //         placeholder={`Max`}
// // //         className="w-24 border shadow rounded"
// // //       />
// // //     </div>
// // //   ) : (
// // //     <input
// // //       type="text"
// // //       value={(columnFilterValue ?? '') as string}
// // //       onChange={e => column.setFilterValue(e.target.value)}
// // //       placeholder={`Search...`}
// // //       className="w-36 border shadow rounded"
// // //     />
// // //   )
// // // }

// // // function IndeterminateCheckbox({
// // //   indeterminate,
// // //   className = '',
// // //   ...rest
// // // }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
// // //   const ref = React.useRef<HTMLInputElement>(null!)

// // //   React.useEffect(() => {
// // //     if (typeof indeterminate === 'boolean') {
// // //       ref.current.indeterminate = !rest.checked && indeterminate
// // //     }
// // //   }, [ref, indeterminate])

// // //   return (
// // //     <input
// // //       type="checkbox"
// // //       ref={ref}
// // //       className={className + ' cursor-pointer'}
// // //       {...rest}
// // //     />
// // //   )
// // // }


// // // export default MyTable


// // import React, { HTMLProps } from 'react'

// // import './index.css'

// // import {
// //   useReactTable,
// //   getCoreRowModel,
// //   getPaginationRowModel,
// //   getFilteredRowModel,
// //   getExpandedRowModel,
// //   flexRender,
// //   ColumnDef,
// //   Table,
// //   ExpandedState,
// // } from '@tanstack/react-table'

// // // Instead of makeData, import your JSON data
// // import jsonData from '../public/data.json' // adjust the path if needed

// // // Define a helper for determining sub rows
// // const getSubRows = (row: any) => {
// //   if (row.tiposDeGasto) {
// //     return row.tiposDeGasto
// //   } else if (row.cuentas) {
// //     return row.cuentas
// //   }
// //   return undefined
// // }

// // function MyTable() {
// //   const rerender = React.useReducer(() => ({}), {})[1]

// //   // Define columns for the tree
// //   const columns = React.useMemo<ColumnDef<any>[]>(
// //     () => [
// //       {
// //         // Main tree column: show name based on row level
// //         header: () => 'Nombre',
// //         cell: ({ row }) => {
// //           // Pick the right field based on the level of the row:
// //           // Level 0: categoriaCuenta, Level 1: tipoGasto, Level 2: nombreCuenta.
// //           const original = row.original
// //           const name =
// //             original.categoriaCuenta ||
// //             original.tipoGasto ||
// //             original.nombreCuenta ||
// //             '—'
// //           return (
// //             <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
// //               <IndeterminateCheckbox
// //                 {...{
// //                   checked: row.getIsSelected(),
// //                   indeterminate: row.getIsSomeSelected(),
// //                   onChange: row.getToggleSelectedHandler(),
// //                 }}
// //               />{' '}
// //               {row.getCanExpand() ? (
// //                 <button
// //                   onClick={row.getToggleExpandedHandler()}
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   {row.getIsExpanded() ? '👇' : '👉'}
// //                 </button>
// //               ) : (
// //                 '🔵'
// //               )}{' '}
// //               {name}
// //             </div>
// //           )
// //         },
// //       },
// //       {
// //         header: () => 'Débito',
// //         accessorFn: row => (row.detalles ? row.detalles.debito : null),
// //       },
// //       {
// //         header: () => 'Crédito',
// //         accessorFn: row => (row.detalles ? row.detalles.credito : null),
// //       },
// //       {
// //         header: () => 'Fecha Referencia',
// //         accessorFn: row => (row.detalles ? row.detalles.fechaReferencia : null),
// //       },
// //       // You can add more columns to show additional details from `detalles`
// //     ],
// //     []
// //   )

// //   // Instead of using makeData, use the imported JSON
// //   const [data, setData] = React.useState(() => jsonData)
// //   const refreshData = () => setData(() => jsonData)

// //   const [expanded, setExpanded] = React.useState<ExpandedState>({})

// //   const table = useReactTable({
// //     data,
// //     columns,
// //     state: {
// //       expanded,
// //     },
// //     onExpandedChange: setExpanded,
// //     getSubRows, // use our custom function
// //     getCoreRowModel: getCoreRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getExpandedRowModel: getExpandedRowModel(),
// //     debugTable: true,
// //   })

// //   return (
// //     <div className="p-2">
// //       <div className="h-2" />
// //       <table>
// //         <thead>
// //           {table.getHeaderGroups().map(headerGroup => (
// //             <tr key={headerGroup.id}>
// //               {headerGroup.headers.map(header => (
// //                 <th key={header.id} colSpan={header.colSpan}>
// //                   {header.isPlaceholder
// //                     ? null
// //                     : flexRender(
// //                         header.column.columnDef.header,
// //                         header.getContext()
// //                       )}
// //                 </th>
// //               ))}
// //             </tr>
// //           ))}
// //         </thead>
// //         <tbody>
// //           {table.getRowModel().rows.map(row => (
// //             <tr key={row.id}>
// //               {row.getVisibleCells().map(cell => (
// //                 <td key={cell.id}>
// //                   {flexRender(
// //                     cell.column.columnDef.cell,
// //                     cell.getContext()
// //                   )}
// //                 </td>
// //               ))}
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //       <div className="h-2" />
// //       <div className="flex items-center gap-2">
// //         <button
// //           className="border rounded p-1"
// //           onClick={() => table.setPageIndex(0)}
// //           disabled={!table.getCanPreviousPage()}
// //         >
// //           {'<<'}
// //         </button>
// //         <button
// //           className="border rounded p-1"
// //           onClick={() => table.previousPage()}
// //           disabled={!table.getCanPreviousPage()}
// //         >
// //           {'<'}
// //         </button>
// //         <button
// //           className="border rounded p-1"
// //           onClick={() => table.nextPage()}
// //           disabled={!table.getCanNextPage()}
// //         >
// //           {'>'}
// //         </button>
// //         <button
// //           className="border rounded p-1"
// //           onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// //           disabled={!table.getCanNextPage()}
// //         >
// //           {'>>'}
// //         </button>
// //         <span className="flex items-center gap-1">
// //           <div>Page</div>
// //           <strong>
// //             {table.getState().pagination.pageIndex + 1} of{' '}
// //             {table.getPageCount()}
// //           </strong>
// //         </span>
// //         <span className="flex items-center gap-1">
// //           | Go to page:
// //           <input
// //             type="number"
// //             min="1"
// //             max={table.getPageCount()}
// //             defaultValue={table.getState().pagination.pageIndex + 1}
// //             onChange={e => {
// //               const page = e.target.value ? Number(e.target.value) - 1 : 0
// //               table.setPageIndex(page)
// //             }}
// //             className="border p-1 rounded w-16"
// //           />
// //         </span>
// //         <select
// //           value={table.getState().pagination.pageSize}
// //           onChange={e => {
// //             table.setPageSize(Number(e.target.value))
// //           }}
// //         >
// //           {[10, 20, 30, 40, 50].map(pageSize => (
// //             <option key={pageSize} value={pageSize}>
// //               Show {pageSize}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div>{table.getRowModel().rows.length} Rows</div>
// //       <div>
// //         <button onClick={() => rerender()}>Force Rerender</button>
// //       </div>
// //       <div>
// //         <button onClick={() => refreshData()}>Refresh Data</button>
// //       </div>
// //       <label>Expanded State:</label>
// //       <pre>{JSON.stringify(expanded, null, 2)}</pre>
// //       <label>Row Selection State:</label>
// //       <pre>{JSON.stringify(table.getState().rowSelection, null, 2)}</pre>
// //     </div>
// //   )
// // }

// // // Keep your Filter and IndeterminateCheckbox components as before:
// // function Filter({
// //   column,
// //   table,
// // }: {
// //   column: any
// //   table: Table<any>
// // }) {
// //   const firstValue = table
// //     .getPreFilteredRowModel()
// //     .flatRows[0]?.getValue(column.id)

// //   const columnFilterValue = column.getFilterValue()

// //   return typeof firstValue === 'number' ? (
// //     <div className="flex space-x-2">
// //       <input
// //         type="number"
// //         value={(columnFilterValue as [number, number])?.[0] ?? ''}
// //         onChange={e =>
// //           column.setFilterValue((old: [number, number]) => [
// //             e.target.value,
// //             old?.[1],
// //           ])
// //         }
// //         placeholder={`Min`}
// //         className="w-24 border shadow rounded"
// //       />
// //       <input
// //         type="number"
// //         value={(columnFilterValue as [number, number])?.[1] ?? ''}
// //         onChange={e =>
// //           column.setFilterValue((old: [number, number]) => [
// //             old?.[0],
// //             e.target.value,
// //           ])
// //         }
// //         placeholder={`Max`}
// //         className="w-24 border shadow rounded"
// //       />
// //     </div>
// //   ) : (
// //     <input
// //       type="text"
// //       value={(columnFilterValue ?? '') as string}
// //       onChange={e => column.setFilterValue(e.target.value)}
// //       placeholder={`Search...`}
// //       className="w-36 border shadow rounded"
// //     />
// //   )
// // }

// // function IndeterminateCheckbox({
// //   indeterminate,
// //   className = '',
// //   ...rest
// // }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
// //   const ref = React.useRef<HTMLInputElement>(null!)

// //   React.useEffect(() => {
// //     if (typeof indeterminate === 'boolean') {
// //       ref.current.indeterminate = !rest.checked && indeterminate
// //     }
// //   }, [ref, indeterminate, rest.checked])

// //   return (
// //     <input
// //       type="checkbox"
// //       ref={ref}
// //       className={className + ' cursor-pointer'}
// //       {...rest}
// //     />
// //   )
// // }

// // export default MyTable



// import React from 'react'
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getExpandedRowModel,
//   ColumnDef,
// } from '@tanstack/react-table'
// import jsonData from '../public/data.json'

// console.log(jsonData)

// // Helper function: Recursively compute the "Resultado Funcion"
// // For level 2 rows, it calculates debito - credito.
// // For higher levels, it sums the results from all its child rows.
// const computeResultadoFuncion = (row: any): number => {
//   if (row.detalles) {
//     return row.detalles.debito - row.detalles.credito
//   } else if (row.tiposDeGasto) {
//     // Level 0: sum over its tiposDeGasto children
//     return row.tiposDeGasto.reduce(
//       (sum: number, child: any) => sum + computeResultadoFuncion(child),
//       0
//     )
//   } else if (row.cuentas) {
//     // Level 1: sum over its cuentas children
//     return row.cuentas.reduce(
//       (sum: number, child: any) => sum + computeResultadoFuncion(child),
//       0
//     )
//   }
//   return 0
// }

// // Helper function: Determines which label to show for the "Funcion" column.
// const getFuncionLabel = (row: any): string => {
//   if (row.categoriaCuenta) return row.categoriaCuenta
//   if (row.tipoGasto) return row.tipoGasto
//   if (row.nombreCuenta) return row.nombreCuenta
//   return ''
// }

// // Define getSubRows so the table knows how to find child rows.
// // Level 0 rows have children in "tiposDeGasto"
// // Level 1 rows have children in "cuentas"
// const getSubRows = (row: any) => {
//   if (row.tiposDeGasto) return row.tiposDeGasto
//   if (row.cuentas) return row.cuentas
//   return undefined
// }

// // Function that returns the two column definitions.
// const getColumns = (): ColumnDef<any>[] => [
//   {
//     header: 'Funcion',
//     cell: ({ row }) => {
//       const label = getFuncionLabel(row.original)
//       return (
//         <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
//           {row.getCanExpand() ? (
//             <button
//               onClick={row.getToggleExpandedHandler()}
//               style={{ cursor: 'pointer' }}
//             >
//               {row.getIsExpanded() ? '👇' : '👉'}
//             </button>
//           ) : (
//             '🔵'
//           )}{' '}
//           {label}
//         </div>
//       )
//     },
//   },
//   {
//     header: 'Resultado Funcion',
//     cell: ({ row }) => {
//       const result = computeResultadoFuncion(row.original)
//       return <span>{result}</span>
//     },
//   },
// ]

// function MyTable() {
//   // Initialize table state with data from the JSON file
//   const [data] = React.useState(() => jsonData)
//   const [expanded, setExpanded] = React.useState({})

//   const columns = React.useMemo(() => getColumns(), [])

//   const table = useReactTable({
//     data,
//     columns,
//     state: { expanded },
//     onExpandedChange: setExpanded,
//     getSubRows,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//   })

//   return (
//     <div className="p-2">
//       <table>
//         <thead>
//           {table.getHeaderGroups().map(headerGroup => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map(header => (
//                 <th key={header.id}>
//                   {header.isPlaceholder
//                     ? null
//                     : header.renderHeader()}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map(row => (
//             <tr key={row.id}>
//               {row.getVisibleCells().map(cell => (
//                 <td key={cell.id}>
//                   {cell.renderCell()}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default MyTable



import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import jsonData from '../public/data.json' // adjust path as necessary

// Recursively compute "Resultado Funcion"
// Level 2: return detalles.debito - detalles.credito
// Level 0 and 1: sum results from child rows
const computeResultadoFuncion = (row: any): number => {
  if (row.detalles) {
    return row.detalles.debito - row.detalles.credito
  } else if (row.tiposDeGasto) {
    // Level 0 row
    return row.tiposDeGasto.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    )
  } else if (row.cuentas) {
    // Level 1 row
    return row.cuentas.reduce(
      (sum: number, child: any) => sum + computeResultadoFuncion(child),
      0
    )
  }
  return 0
}

// Determine which label to show for "Funcion"
const getFuncionLabel = (row: any): string => {
  if (row.categoriaCuenta) return row.categoriaCuenta
  if (row.tipoGasto) return row.tipoGasto
  if (row.nombreCuenta) return row.nombreCuenta
  return ''
}

// Tell the table where to find child rows.
// Level 0 rows have children in "tiposDeGasto"
// Level 1 rows have children in "cuentas"
const getSubRows = (row: any) => {
  if (row.tiposDeGasto) return row.tiposDeGasto
  if (row.cuentas) return row.cuentas
  return undefined
}

// Function returning the two column definitions
const getColumns = (): ColumnDef<any>[] => [
  {
    header: 'Funcion',
    cell: ({ row }) => {
      const label = getFuncionLabel(row.original)
      return (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }}>
          {row.getCanExpand() ? (
            <button
              onClick={row.getToggleExpandedHandler()}
              style={{ cursor: 'pointer' }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          ) : (
            '🔵'
          )}{' '}
          {label}
        </div>
      )
    },
  },
  {
    header: 'Resultado Funcion',
    cell: ({ row }) => {
      const result = computeResultadoFuncion(row.original)
      return <span>{result}</span>
    },
  },
]

function MyTable() {
  const [data] = React.useState(() => jsonData)
  const [expanded, setExpanded] = React.useState({})

  const columns = React.useMemo(() => getColumns(), [])

  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getSubRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <div className="p-2">
      <div style={{ overflowY: 'auto', maxHeight: '1500px' }}></div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyTable
