import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// import Apppp from './Content'
import ExampleComponent from './nestedTable'
// import TestFunctions from './TestTable'




// import MyTable from './MyTable.tsx'
// import MyNewTable from './NewTable.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <MyTable/> */}
    {/* <MyNewTable /> */}
    {/* <MusicAwardTable data={sourceDataObject} /> */}
    {/* <Apppp/> */}
    <ExampleComponent/>
    {/* <TestFunctions/> */}
  </StrictMode>,
)




