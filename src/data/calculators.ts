// Bu dosya artık YAML dosyasından otomatik olarak oluşturuluyor
// Düzenlemeler için: src/data/calculators.yaml dosyasını düzenleyin

import calculatorsYaml from './calculators.yaml?raw';
import { loadCalculatorsFromYaml, type CalculatorConfig, type CalculatorInput, type CalculatorItem, type CalculatorVariant } from './calculators-loader';

// Tipleri re-export et
export type { CalculatorConfig, CalculatorInput, CalculatorItem, CalculatorVariant };

export type CalculatorState = {
  config: CalculatorConfig;
  inputs: Record<string, number>;
  selectedVariantKey?: string | null;
};

// YAML dosyasından hesaplayıcıları yükle
export const calculators: CalculatorConfig[] = loadCalculatorsFromYaml(calculatorsYaml);
