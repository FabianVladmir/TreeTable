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

interface Summary {
    nonNull: { count: number; accounts: string[] };
    null: { count: number; accounts: string[] };
}

interface DivisionSummary {
    [division: string]: {
        nonNull: { count: number; accounts: string[] };
        null: { count: number; accounts: string[] };
    };
}

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
                if (!result[nombreCuenta].includes(detalles.nombreCentroCostos)) {
                    result[nombreCuenta].push(detalles.nombreCentroCostos);
                }
            });
        });
    });

    return result;
};

const computeSummary = (
    mapping: { [nombreCuenta: string]: (string | null)[] }
): Summary => {
    const summary: Summary = {
        nonNull: { count: 0, accounts: [] },
        null: { count: 0, accounts: [] },
    };

    Object.entries(mapping).forEach(([account, centros]) => {

        const nonNullCentros = centros.filter((c) => c !== null && c !== '');
        const nullCentros = centros.filter((c) => c === null || c === '');

        if (nonNullCentros.length > 0) {
            summary.nonNull.count += nonNullCentros.length;
            summary.nonNull.accounts.push(account);
        }
        if (nullCentros.length > 0) {
            summary.null.count += nullCentros.length;
            summary.null.accounts.push(account);
        }
    });

    return summary;
};
const computeDivisionSummary = (
    mapping: { [nombreCuenta: string]: (string | null)[] }
): DivisionSummary => {
    const divisionSummary: DivisionSummary = {};

    Object.entries(mapping).forEach(([account, centros]) => {
        let division = 'Other';
        if (account.includes('(GEN, ADM)')) {
            division = 'GEN, ADM';
        } else if (account.includes('(GEN, COMERC)')) {
            division = 'GEN, COMERC';
        }

        if (!divisionSummary[division]) {
            divisionSummary[division] = {
                nonNull: { count: 0, accounts: [] },
                null: { count: 0, accounts: [] },
            };
        }

        const nonNullCount = centros.filter((c) => c !== null && c !== '').length;
        const nullCount = centros.filter((c) => c === null || c === '').length;

        if (nonNullCount > 0) {
            divisionSummary[division].nonNull.count += nonNullCount;
            divisionSummary[division].nonNull.accounts.push(account);
        }
        if (nullCount > 0) {
            divisionSummary[division].null.count += nullCount;
            divisionSummary[division].null.accounts.push(account);
        }
    });

    return divisionSummary;
};



const CentroCostosComponent: React.FC = () => {
    const [centrosCostosByCuenta, setCentrosCostosByCuenta] = useState<{ [nombreCuenta: string]: (string | null)[] }>({});
    const [summary, setSummary] = useState<Summary>({
        nonNull: { count: 0, accounts: [] },
        null: { count: 0, accounts: [] },
    });
    const [divisionSummary, setDivisionSummary] = useState<DivisionSummary>({});


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch('/data.json');
                // const response = await fetch('/data.json');
                console.log(response);
                if (!response.ok) throw new Error('Fallo al cargar los datos');

                const data: CategoriaCuenta[] = await response.json();

                const mapping = getCentroCostosByCuenta(data);
                setCentrosCostosByCuenta(mapping);

                setSummary(computeSummary(mapping));
                setDivisionSummary(computeDivisionSummary(mapping));
            } catch (err) {
                console.log((err as Error).message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Centro Costos by Cuenta</h2>
            <ul>
                {Object.entries(centrosCostosByCuenta).map(([cuenta, centros]) => (
                    <li key={cuenta}>
                        <strong>{cuenta}</strong> - {centros.length} centros de costos(s): {centros.join(', ')}
                    </li>
                ))}
            </ul>
            <div>
                <h3>Resumen</h3>
                <p>
                    {summary.nonNull.count} Centros de costos con valores: {summary.nonNull.accounts.join(', ')}
                </p>
                <p>
                    {summary.null.count} Centros de costos sin valores: {summary.null.accounts.join(', ')}
                </p>
            </div>
            <div>
                <h3>Summary by Division</h3>
                {Object.entries(divisionSummary).map(([division, info]) => (
                    <div key={division}>
                        <h4>{division}</h4>
                        <p>
                            {info.nonNull.count} Centros de costos con valores: {info.nonNull.accounts.join(', ')}
                        </p>
                        <p>
                            {info.null.count} Centros de costos sin valores: {info.null.accounts.join(', ')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CentroCostosComponent;
