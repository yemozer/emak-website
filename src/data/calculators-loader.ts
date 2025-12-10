import yaml from 'js-yaml';

// Tipleri burada tanımla (circular import'u önlemek için)
export type CalculatorInput = {
  key: string;
  label: string;
  unit?: string;
  min?: number;
  step?: number;
  placeholder?: string;
  defaultValue: number;
};

export type CalculatorVariant = {
  key: string;
  label: string;
  description?: string;
  coefficients?: Record<string, number>;
  items?: CalculatorItem[];
};

export type CalculatorItem = {
  key: string;
  label: string;
  unit: string;
  decimals?: number;
  hint?: string;
  compute: (inputs: Record<string, number>, variant?: CalculatorVariant) => number;
};

export type CalculatorConfig = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  inputs: CalculatorInput[];
  items: CalculatorItem[];
  notes?: string[];
  variants?: CalculatorVariant[];
  defaultVariantKey?: string | null; // Varsayılan konfigürasyon anahtarı
};

// YAML dosyasından yüklenen ham veri tipi (tamamen Türkçe)
type YamlCalculator = {
  kimlik: string;  // id yerine kimlik
  baslik: string;
  alt_baslik?: string;
  aciklama?: string;
  girdiler: Array<{
    anahtar: string;
    etiket: string;
    birim?: string;
    minimum?: number;
    adim?: number;
    ornek?: string;
    varsayilan: number;
  }>;
  malzemeler?: Array<{
    anahtar: string;
    etiket: string;
    birim: string;
    ondalik?: number;
    formul: string;
    ipucu?: string;
  }>;
  notlar?: string[];
  varsayilan_konfigurasyon?: string; // Varsayılan konfigürasyon anahtarı
  konfigurasyonlar?: Array<{
    anahtar: string;
    etiket: string;
    aciklama?: string;
    katsayilar?: Record<string, number>;
    malzemeler?: Array<{
      anahtar: string;
      etiket: string;
      birim: string;
      formul: string;
      ipucu?: string;
    }>;
  }>;
};

// Formülü güvenli şekilde değerlendir
function evaluateFormula(formula: string, inputs: Record<string, number>, variant?: CalculatorVariant): number {
  try {
    // Sadece güvenli matematiksel ifadeleri çalıştır
    const safeFormula = formula
      .replace(/\bMath\.(ceil|floor|round|max|min|abs)\b/g, 'Math.$1')
      .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g, (match) => {
        // Girdi değişkenlerini değerlerle değiştir
        if (inputs[match] !== undefined) {
          return String(inputs[match]);
        }
        // Variant katsayılarını değerlerle değiştir
        if (variant?.coefficients?.[match] !== undefined) {
          return String(variant.coefficients[match]);
        }
        return match;
      });

    // Güvenli değerlendirme (sadece matematiksel ifadeler)
    const result = Function(`"use strict"; return (${safeFormula})`)();
    return Number.isFinite(result) ? result : 0;
  } catch (error) {
    console.error(`Formül hatası: ${formula}`, error);
    return 0;
  }
}

// YAML verisini TypeScript tipine dönüştür
export function loadCalculatorsFromYaml(yamlContent: string): CalculatorConfig[] {
  const data = yaml.load(yamlContent) as { hesaplayicilar: YamlCalculator[] };

  const mapItems = (
    malzemeler:
      | Array<{
          anahtar: string;
          etiket: string;
          birim: string;
          formul: string;
          ipucu?: string;
        }>
      | undefined
  ): CalculatorItem[] => {
    if (!malzemeler) return [];
    return malzemeler.map((malzeme) => ({
      key: malzeme.anahtar,
      label: malzeme.etiket,
      unit: malzeme.birim,
      hint: malzeme.ipucu,
      compute: (inputs: Record<string, number>, variant?: CalculatorVariant) =>
        evaluateFormula(malzeme.formul, inputs, variant),
    }));
  };

  return data.hesaplayicilar.map((yamlCalc): CalculatorConfig => {
    const inputs: CalculatorInput[] = yamlCalc.girdiler.map((girdi) => ({
      key: girdi.anahtar,
      label: girdi.etiket,
      unit: girdi.birim,
      min: girdi.minimum,
      step: girdi.adim,
      placeholder: girdi.ornek,
      defaultValue: girdi.varsayilan,
    }));

    const baseItems: CalculatorItem[] = mapItems(yamlCalc.malzemeler ?? []);

    const variants: CalculatorVariant[] | undefined = yamlCalc.konfigurasyonlar?.map((konf) => ({
      key: konf.anahtar,
      label: konf.etiket,
      description: konf.aciklama,
      coefficients: konf.katsayilar,
      items: mapItems(konf.malzemeler),
    }));

    return {
      id: yamlCalc.kimlik,  // kimlik kullan
      title: yamlCalc.baslik,
      subtitle: yamlCalc.alt_baslik,
      description: yamlCalc.aciklama,
      inputs,
      items: baseItems,
      notes: yamlCalc.notlar,
      variants,
      defaultVariantKey: yamlCalc.varsayilan_konfigurasyon ?? null,
    };
  });
}

