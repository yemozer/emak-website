import yaml from 'js-yaml';
import { ALL_CITIES, type CityData } from './cities';

// Constants for city markers (not variables, defined in code)
export const CITY_MARKER_COLOR = '#1e40af';
export const CITY_MARKER_OPACITY = 0.9;

// Auto-generate styling based on factory count
function getRadius(count: number): number {
  if (count >= 10) return 16;
  if (count >= 5) return 14;
  if (count >= 2) return 13;
  return 12;
}

function getFontSize(count: number): number {
  if (count >= 10) return 12;
  if (count >= 5) return 11;
  return 10;
}

function getLabelSize(count: number): number {
  if (count >= 10) return 11;
  return 10;
}

export type FactoryRecord = {
  ad: string;
  sehir: string; // City name (e.g., "Ankara" instead of "TR06")
  lat?: number; // Optional exact coordinates for factory
  lng?: number; // Optional exact coordinates for factory
};

export type FactoryCity = {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  fontSize: number;
  labelSize: number;
  color: string;
  opacity: number;
  count: number;
};

export type FactoryMarker = {
  code: string;
  name: string;
  lat: number;
  lng: number;
  count: number;
  factories: string[];
};

export type FactoryItem = {
  name: string;
  cityId: string;
  lat?: number; // Optional exact coordinates for factory
  lng?: number; // Optional exact coordinates for factory
};

export type FactoryPoint = {
  id: string; // Unique ID for this factory point
  name: string; // Factory name
  cityId: string;
  cityName: string;
  lat: number;
  lng: number;
  isExact: boolean; // true if using factory coordinates, false if using city coordinates
};

type FactoriesYaml = {
  fabrikalar: FactoryRecord[];
};

export function loadFactoriesFromYaml(yamlContent: string): { cities: FactoryCity[]; factories: FactoryItem[]; markers: FactoryMarker[]; factoryPoints: FactoryPoint[] } {
  const data = yaml.load(yamlContent) as FactoriesYaml;
  const fabrikalar = data.fabrikalar || [];

  // Create a mapping from city name to city ID
  const cityNameToId = new Map<string, string>();
  ALL_CITIES.forEach((city) => {
    cityNameToId.set(city.name.toLowerCase(), city.id);
  });

  // Map city names to IDs and group factories by city ID
  const grouped: Record<string, string[]> = {};
  fabrikalar.forEach((fab) => {
    if (!fab.sehir) return;
    const cityId = cityNameToId.get(fab.sehir.toLowerCase());
    if (!cityId) {
      console.warn(`City "${fab.sehir}" not found in city list. Factory "${fab.ad}" will be skipped.`);
      return;
    }
    if (!grouped[cityId]) grouped[cityId] = [];
    grouped[cityId].push(fab.ad);
  });

  // Use ALL_CITIES constant and auto-generate styling
  // Only include cities that have factories (count > 0)
  const cities: FactoryCity[] = ALL_CITIES.map((city: CityData) => {
    const count = grouped[city.id]?.length ?? 0;
    return {
      id: city.id,
      name: city.name,
      x: city.x,
      y: city.y,
      radius: getRadius(count),
      fontSize: getFontSize(count),
      labelSize: getLabelSize(count),
      color: CITY_MARKER_COLOR,
      opacity: CITY_MARKER_OPACITY,
      count,
    };
  }).filter((city) => city.count > 0);

  // Map factories with city name to city ID
  const factories: FactoryItem[] = fabrikalar.map((fab) => {
    const cityId = cityNameToId.get(fab.sehir.toLowerCase());
    return {
      name: fab.ad,
      cityId: cityId || '',
      lat: fab.lat,
      lng: fab.lng,
    };
  }).filter((fab) => fab.cityId !== ''); // Filter out factories with invalid city names

  // Only include markers for cities that have factories (count > 0)
  const markers: FactoryMarker[] = ALL_CITIES
    .filter((city) => Number.isFinite(city.lat) && Number.isFinite(city.lng))
    .map((city) => ({
      code: city.id,
      name: city.name,
      lat: city.lat,
      lng: city.lng,
      count: grouped[city.id]?.length ?? 0,
      factories: grouped[city.id] || [],
    }))
    .filter((marker) => marker.count > 0);

  // Create factory points for detailed map view
  // If factory has exact coordinates, use those; otherwise use city coordinates
  const factoryPoints: FactoryPoint[] = factories.map((factory, index) => {
    const city = ALL_CITIES.find((c) => c.id === factory.cityId);
    if (!city) return null;
    
    const hasExactCoords = Number.isFinite(factory.lat) && Number.isFinite(factory.lng);
    
    return {
      id: `factory-${factory.cityId}-${index}`,
      name: factory.name,
      cityId: factory.cityId,
      cityName: city.name,
      lat: hasExactCoords ? factory.lat! : city.lat,
      lng: hasExactCoords ? factory.lng! : city.lng,
      isExact: hasExactCoords,
    };
  }).filter((point): point is FactoryPoint => point !== null);

  return { cities, factories, markers, factoryPoints };
}

