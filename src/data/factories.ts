import factoriesYaml from './factories.yaml?raw';
import { loadFactoriesFromYaml, type FactoryCity, type FactoryItem, type FactoryMarker, type FactoryPoint } from './factories-loader';

const { cities, factories, markers, factoryPoints } = loadFactoriesFromYaml(factoriesYaml);

export { cities, factories, markers, factoryPoints };
export type { FactoryCity, FactoryItem, FactoryMarker, FactoryPoint };

