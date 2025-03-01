import React, { useState, useEffect } from 'react';

interface Detalles {
  tipoResultadoFuncion: string;
  nivelJerarquia: number;
  ordVisualizacion: number;
  codigoCentroBeneficio: string;
  segment0: string;
  segment1: string;
  segment2: string;
  asientoId: number;
  fechaReferencia: string;
  fechaVenc: string;
  codCuentaContable: string;
  debito: number;
  credito: number;
  memorandum: string;
  dim1: string | null;
  dim2: string | null;
  dim3: string | null;
  dim4: string | null;
  nombreCentroCostos: string | null;
}

interface Cuenta {
  nombreCuenta: string;
  detalles: Detalles;
}

interface TipoDeGasto {
  tipoGasto: string;
  cuentas: Cuenta[];
}

interface CategoriaCuenta {
  categoriaCuenta: string;
  tiposDeGasto: TipoDeGasto[];
}

/**
 * Build a mapping of each account (nombreCuenta) to an array of unique cost centers.
 */
const getCentroCostosByCuenta = (
  data: CategoriaCuenta[]
): { [nombreCuenta: string]: (string | null)[] } => {
  const result: { [nombreCuenta: string]: (string | null)[] } = {};

  data.forEach((categoria) => {
    categoria.tiposDeGasto.forEach((tipo) => {
      tipo.cuentas.forEach((cuenta) => {
        const { nombreCuenta, detalles } = cuenta;
        if (!result[nombreCuenta]) {
          result[nombreCuenta] = [];
        }
        // Ensure uniqueness
        if (!result[nombreCuenta].includes(detalles.nombreCentroCostos)) {
          result[nombreCuenta].push(detalles.nombreCentroCostos);
        }
      });
    });
  });

  return result;
};

/**
 * Build a mapping of each cost center to the array of accounts that reference it.
 */
const getAccountsByCostCenter = (
  accountsMapping: { [nombreCuenta: string]: (string | null)[] }
): { [costCenter: string]: string[] } => {
  const costCenterMapping: { [costCenter: string]: string[] } = {};

  Object.entries(accountsMapping).forEach(([account, costCenters]) => {
    costCenters.forEach((costCenter) => {
      // Use a placeholder key for null or empty values
      const key = costCenter === null || costCenter === '' ? 'null' : costCenter;
      if (!costCenterMapping[key]) {
        costCenterMapping[key] = [];
      }
      if (!costCenterMapping[key].includes(account)) {
        costCenterMapping[key].push(account);
      }
    });
  });

  return costCenterMapping;
};

const CostCenterRelationsComponent: React.FC = () => {
  const [accountsMapping, setAccountsMapping] = useState<{ [nombreCuenta: string]: (string | null)[] }>({});
  const [costCenterMapping, setCostCenterMapping] = useState<{ [costCenter: string]: string[] }>({});
  const [sharedCostCenters, setSharedCostCenters] = useState<{ [costCenter: string]: string[] }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the JSON data from /data.json
        const response = await fetch('/data_dic_prod.json');
        console.log(response);
        if (!response.ok) throw new Error('Fallo al cargar los datos');

        const data: CategoriaCuenta[] = await response.json();
        // Build account to cost center mapping
        const mapping = getCentroCostosByCuenta(data);
        setAccountsMapping(mapping);

        // Build the reverse mapping: cost center to accounts
        const ccMapping = getAccountsByCostCenter(mapping);
        setCostCenterMapping(ccMapping);

        // Identify shared cost centers (associated with more than one account)
        const shared: { [costCenter: string]: string[] } = {};
        Object.entries(ccMapping).forEach(([costCenter, accounts]) => {
          if (accounts.length > 1) {
            shared[costCenter] = accounts;
          }
        });
        setSharedCostCenters(shared);
      } catch (err) {
        console.log((err as Error).message);
      }
    };

    fetchData();
  }, []);

  // Compute summary values.
  const totalAccounts = Object.keys(accountsMapping).length;
  const totalCostCenters = Object.keys(costCenterMapping).length;
  const totalSharedCostCenters = Object.keys(sharedCostCenters).length;

  return (
    <div>
      <h2>Relation Between Accounts and Cost Centers</h2>

      <section>
        <h3>Cuentas con centros de costos</h3>
        <ul>
          {Object.entries(accountsMapping).map(([account, costCenters]) => (
            <li key={account}>
              <strong>{account}</strong> - {costCenters.length} centros de costos(s): {costCenters.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Cuentas de centros de costos</h3>
        <ul>
          {Object.entries(costCenterMapping).map(([costCenter, accounts]) => (
            <li key={costCenter}>
              <strong>{costCenter}</strong> - esta asociado con {accounts.length} cuenta(s): {accounts.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Centros de costos compartidos</h3>
        {Object.keys(sharedCostCenters).length > 0 ? (
          <ul>
            {Object.entries(sharedCostCenters).map(([costCenter, accounts]) => (
              <li key={costCenter}>
                <strong>{costCenter}</strong> esta asociado con {accounts.length} cuentas: {accounts.join(', ')}
              </li>
            ))}
          </ul>
        ) : (
          <p>No cost center is shared between multiple accounts.</p>
        )}
      </section>

      <section>
        <h3>Summary</h3>
        <p>Total accounts processed: {totalAccounts}</p>
        <p>Total unique cost centers: {totalCostCenters}</p>
        <p>Total shared cost centers: {totalSharedCostCenters}</p>
      </section>
    </div>
  );
};

export default CostCenterRelationsComponent;
