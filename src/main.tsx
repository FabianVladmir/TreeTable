import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


// import Apppp from './Content'
// import ExampleComponent from './nestedTable'
import TableTest from './TestTable'
// import TestFunctions from './TestTable'




// import MyTable from './MyTable.tsx'
// import MyNewTable from './NewTable.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    {/* <ExampleComponent/> */}
    <TableTest/>
    {/* <TestFunctions/> */}
  </StrictMode>,
)




