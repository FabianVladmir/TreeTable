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

// returning the columns
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
