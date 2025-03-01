// import { useRef, useState } from 'react';
// import { HotTable } from '@handsontable/react-wrapper';
// import { registerAllModules } from 'handsontable/registry';
// import 'handsontable/styles/handsontable.css';
// import 'handsontable/styles/ht-theme-main.css';

// registerAllModules();

// // interface TableData {
// //   category?: string;
// //   artist?: string | null;
// //   title?: string | null;
// //   label?: string | null;
// //   dateOfPublish?: string;
// //   sold?: boolean;
// //   price?: number;
// //   availability?: boolean;
// //   store?: string | null;
// //   __children?: TableData[];
// //   __expanded? : boolean
// // }


// interface TableData {
//   category?: string;
//   artist?: string | null;
//   title?: string | null;
//   label?: string | null;
//   album?: string;
//   detail?: string;
//   __children?: TableData[];
// }
// // Componente principal
// const TableTest = () => {
//   // Referencia al componente HotTable
//   const hotTableComponentRef = useRef<any>(null);

//   // Estado para controlar si la tabla está expandida o colapsada
//   const [isExpanded, setIsExpanded] = useState(true);

//   // Datos de ejemplo (similares al ejemplo que proporcionaste)
//   // const sourceDataObject: TableData[] = [
//   //   {
//   //     category: 'Best Rock Performance',
//   //     artist: null,
//   //     title: null,
//   //     label: null,
//   //     dateOfPublish: '03/2024',
//   //     sold: true,
//   //     price: 0,
//   //     availability: false,
//   //     store: null,
//   //     __children: [
//   //       {
//   //         title: "Don't Wanna Fight",
//   //         artist: 'Alabama Shakes',
//   //         label: 'ATO Records',
//   //         dateOfPublish: '03/2024',
//   //         sold: false,
//   //         price: 60,
//   //         availability: false,
//   //         store: null,
//   //       },
//   //       {
//   //         title: 'What Kind Of Man',
//   //         artist: 'Florence & The Machine',
//   //         label: 'Republic',
//   //         dateOfPublish: '03/2024',
//   //         sold: false,
//   //         price: 70,
//   //         availability: false,
//   //         store: null,
//   //       },
//   //     ],
//   //   },
//   //   {
//   //     category: 'Best Metal Performance',
//   //     dateOfPublish: '03/2024',
//   //     sold: false,
//   //     price: 30,
//   //     availability: false,
//   //     store: null,
//   //     __children: [
//   //       {
//   //         title: 'Cirice',
//   //         artist: 'Ghost',
//   //         label: 'Loma Vista Recordings',
//   //         dateOfPublish: '03/2024',
//   //         sold: false,
//   //         price: 50,
//   //         availability: false,
//   //         store: null,
//   //       },
//   //       {
//   //         title: 'Custer',
//   //         artist: 'Slipknot',
//   //         label: 'Roadrunner Records',
//   //         dateOfPublish: '03/2024',
//   //         sold: true,
//   //         price: 0,
//   //         availability: false,
//   //         store: null,
//   //       },
//   //     ],
//   //   },
//   // ];

//   const sourceDataObject: TableData[] = [
//     {
//       category: 'Best Rock Performance',
//       artist: null,
//       title: null,
//       label: null,
//       __children: [
//         {
//           title: "Don't Wanna Fight",
//           artist: 'Alabama Shakes',
//           label: 'ATO Records',
//           __children: [
//             {
//               album: 'Sound & Color',
//               __children: [
//                 {
//                   label: 'Edición Especial 2023',
//                   __children: [
//                     { detail: 'Versión Remasterizada' },
//                     { detail: 'Incluye Bonus Tracks' }
//                   ]
//                 },
//                 {
//                   label: 'Vinilo Coleccionista',
//                   __children: [
//                     { detail: 'Grabación Analógica' },
//                     { detail: 'Pack Premium' }
//                   ]
//                 }
//               ]
//             }
//           ]
//         },
//         {
//           title: 'What Kind Of Man',
//           artist: 'Florence & The Machine',
//           label: 'Republic',
//           __children: [
//             {
//               album: 'How Big, How Blue, How Beautiful',
//               __children: [
//                 {
//                   label: 'Deluxe Edition',
//                   __children: [
//                     { detail: 'Con DVD Documentary' },
//                     { detail: 'Libro de Arte' }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     },
//     {
//       category: 'Best Metal Performance',
//       __children: [
//         {
//           title: 'Cirice',
//           artist: 'Ghost',
//           label: 'Loma Vista Recordings',
//           __children: [
//             {
//               album: 'Meliora',
//               __children: [
//                 {
//                   label: 'Edición de Lujo',
//                   __children: [
//                     { detail: '2 CDs + Blu-ray' },
//                     { detail: 'Póster Exclusivo' }
//                   ]
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ];

//   const selectionEnd = () => {
//     // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
//     if (hotTableComponentRef.current !== null) {
//       let hot = hotTableComponentRef.current;
//       let plu = hot.hotInstance.getPlugin('NestedRows').collapsingUI;
//       console.log(plu);
//       plu.collapseAll();
//     }
//   };

//   // Función para alternar entre expandir y colapsar
//   const toggleCollapse = () => {
//     if (hotTableComponentRef.current) {
//       const hotInstance = hotTableComponentRef.current.hotInstance;
//       // console.log('HotInstance:', hotInstance);
//       const nestedRowsPlugin = hotInstance.getPlugin('NestedRows');
//       // console.log('NestedRows plugin:', nestedRowsPlugin);
//       const collapsingUI = nestedRowsPlugin.collapsingUI;
//       // console.log('CollapsingUI:', collapsingUI);

//       if (collapsingUI) {
//         if (isExpanded) {
//           collapsingUI.collapseAll();          
//         } else {
//           collapsingUI.expandAll();
          
//           // setIsExpanded(true)
//         }
//         setIsExpanded(!isExpanded);
//       } else {
//         console.error('El collapsingUI no está definido');
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Botón para expandir o colapsar */}
//       <button onClick={toggleCollapse}>
//         {isExpanded ? 'Comprimir' : 'Expandir'}
//       </button>

//       {/* Tabla Handsontable */}
//       <HotTable
//         ref={hotTableComponentRef}
//         // ref={(instance) => {
//         //   hotTableComponentRef.current = instance;
//         // }}
//         data={sourceDataObject}
//         className="ht-theme-main"
//         rowHeaders={true}
//         colHeaders={[
//           'Category',
//           'Artist',
//           'Title',
//           'Label',
//           'Date of Publish',
//           'Sold',
//           'Price',
//           'Availability',
//           'Store',
//         ]}
//         nestedRows={true}
//         afterSelectionEnd={selectionEnd}
//         autoWrapRow={true}
//         autoWrapCol={true}
//         height="auto"
//         licenseKey="non-commercial-and-evaluation"
//         columns={[
//           { data: 'category' },
//           { data: 'artist' },
//           { data: 'title' },
//           { data: 'label' },
//           { data: 'dateOfPublish' },
//           { data: 'sold' },
//           { data: 'price' },
//           { data: 'availability' },
//           { data: 'store' },
//         ]}
//       />
//     </div>
//   );
// };

// export default TableTest;

import { HotTable } from '@handsontable/react-wrapper';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/styles/handsontable.css';
import 'handsontable/styles/ht-theme-main.css';
import { useRef } from 'react';

registerAllModules();

interface TableData {
  category?: string;
  artist?: string | null;
  title?: string | null;
  label?: string | null;
  album?: string;
  detail?: string;
  __children?: TableData[];
}


const TableTest = () => {
  const hotTableComponentRef = useRef<any>(null);
  
  const selectionEnd = () => {
    // The Handsontable instance is stored under the `hotInstance` property of the wrapper component.
    if (hotTableComponentRef.current !== null) {
      let hot = hotTableComponentRef.current;
      let plu = hot.hotInstance.getPlugin('NestedRows').collapsingUI;
      console.log(plu);
      plu.collapseAll();
    }
  };
  const sourceDataObject: TableData[] = [
    {
      category: 'Best Rock Performance',
      artist: null,
      title: null,
      label: null,
      __children: [
        {
          title: "Don't Wanna Fight",
          artist: 'Alabama Shakes',
          label: 'ATO Records',
          __children: [
            {
              album: 'Sound & Color',
              __children: [
                {
                  label: 'Edición Especial 2023',
                  __children: [
                    { detail: 'Versión Remasterizada' },
                    { detail: 'Incluye Bonus Tracks' }
                  ]
                },
                {
                  label: 'Vinilo Coleccionista',
                  __children: [
                    { detail: 'Grabación Analógica' },
                    { detail: 'Pack Premium' }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'What Kind Of Man',
          artist: 'Florence & The Machine',
          label: 'Republic',
          __children: [
            {
              album: 'How Big, How Blue, How Beautiful',
              __children: [
                {
                  label: 'Deluxe Edition',
                  __children: [
                    { detail: 'Con DVD Documentary' },
                    { detail: 'Libro de Arte' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      category: 'Best Metal Performance',
      __children: [
        {
          title: 'Cirice',
          artist: 'Ghost',
          label: 'Loma Vista Recordings',
          __children: [
            {
              album: 'Meliora',
              __children: [
                {
                  label: 'Edición de Lujo',
                  __children: [
                    { detail: '2 CDs + Blu-ray' },
                    { detail: 'Póster Exclusivo' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  return (
    <HotTable
      data={sourceDataObject}
      ref={hotTableComponentRef}
      className="ht-theme-main"
      preventOverflow="horizontal"
      rowHeaders={true}
      colHeaders={['Category', 'Artist', 'Title', 'Album', 'Label', 'Detail']}
      nestedRows={true}
      contextMenu={true}
      bindRowsWithHeaders={true}
      autoWrapRow={true}
      autoWrapCol={true}
      height="auto"
      licenseKey="non-commercial-and-evaluation"
      columns={[
        { data: 'category' },
        { data: 'artist' },
        { data: 'title' },
        { data: 'album' },
        { data: 'label' },
        { data: 'detail' }
      ]}
      afterSelectionEnd={selectionEnd}
    />
  );
};

export default TableTest;