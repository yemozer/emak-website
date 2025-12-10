<template>
  <section class="relative pt-24 md:pt-28 pb-12 md:pb-20">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="mb-8 md:mb-10 text-center">
        <span class="mb-3 inline-block rounded-full bg-[rgb(39,45,122)]/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-[rgb(39,45,122)]">
          Hesap Tabloları
        </span>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[rgb(39,45,122)] mb-3">
          Yapı Sistemleri Hesap Tabloları
        </h2>
        <p class="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-[rgb(178,178,178)] leading-relaxed px-4">
          Farklı sistemler için metraj ve sarfiyat hesaplarını tek ekranda görüntüleyebilirsiniz.
        </p>
      </div>

      <div class="mb-10">
        <div class="flex flex-wrap gap-2 justify-center">
          <button
            v-for="state in calculatorStates"
            :key="state.config.id"
            @click="activeId = state.config.id"
            class="relative rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
            :class="activeId === state.config.id
              ? 'bg-[rgb(39,45,122)] text-white shadow-md'
              : 'bg-white text-[rgb(39,45,122)] border border-[rgb(178,178,178)]/60 hover:border-[rgb(39,45,122)]/60'"
          >
            {{ state.config.title }}
            <span
              v-if="activeId === state.config.id"
              class="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-white/80"
            ></span>
          </button>
        </div>
      </div>

      <div v-if="activeState" class="grid gap-6 lg:grid-cols-3 items-start">
        <div class="bg-white/90 backdrop-blur border border-[rgb(178,178,178)]/20 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-[rgb(39,45,122)]/5 via-transparent to-[rgb(59,70,180)]/5 pointer-events-none"></div>
          <div class="relative flex items-center gap-3 mb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(39,45,122)]/10 text-[rgb(39,45,122)]">
              <Calculator :size="26" />
            </div>
            <div>
              <p class="text-xs tracking-wide text-[rgb(178,178,178)]">Girdi Bilgileri</p>
              <h3 class="text-xl font-semibold text-[rgb(39,45,122)]">{{ activeState.config.subtitle || 'Temel Parametreler' }}</h3>
            </div>
          </div>

          <div class="space-y-5 relative">
            <label v-for="input in activeState.config.inputs" :key="input.key" class="block">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-[rgb(39,45,122)]">{{ input.label }}</span>
                <span class="text-xs text-[rgb(178,178,178)]" v-if="input.unit">{{ input.unit }}</span>
              </div>
              <div class="relative">
                <input
                  v-model.number="activeState.inputs[input.key]"
                  type="number"
                  inputmode="decimal"
                  :min="input.min ?? 0"
                  :step="input.step ?? 0.1"
                  class="w-full rounded-xl border border-[rgb(178,178,178)]/40 bg-white px-4 py-3 text-[rgb(39,45,122)] focus:border-[rgb(39,45,122)] focus:ring-2 focus:ring-[rgb(39,45,122)]/10"
                  :placeholder="input.placeholder"
                />
                <span class="absolute inset-y-0 right-4 flex items-center text-xs font-semibold text-[rgb(178,178,178)]" v-if="input.unit">{{ input.unit }}</span>
              </div>
            </label>

            <div v-if="activeState.config.variants && activeState.config.variants.length > 0" class="space-y-2">
              <div class="flex items-center gap-2 text-sm font-medium text-[rgb(39,45,122)]">
                <SlidersHorizontal :size="16" />
                <span>Konfigürasyon</span>
              </div>
              <select
                v-model="activeState.selectedVariantKey"
                class="w-full rounded-xl border border-[rgb(178,178,178)]/40 bg-white px-4 py-3 text-[rgb(39,45,122)] focus:border-[rgb(39,45,122)] focus:ring-2 focus:ring-[rgb(39,45,122)]/10"
              >
                <option :value="null">-- Seçiniz --</option>
                <option
                  v-for="variant in activeState.config.variants"
                  :key="variant.key"
                  :value="variant.key"
                >
                  {{ variant.label }}
                </option>
              </select>
              <p v-if="getActiveVariant(activeState)?.description" class="text-xs text-[rgb(178,178,178)] leading-relaxed">
                {{ getActiveVariant(activeState)?.description }}
              </p>
            </div>

            <div class="rounded-xl bg-[rgb(39,45,122)]/5 border border-[rgb(39,45,122)]/10 px-4 py-3 text-sm text-[rgb(39,45,122)]/80">
              Veriler varsayılan sarfiyat değerlerine göre hesaplanır. Proje koşullarına göre değişkenlik gösterebilir.
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white/90 backdrop-blur border border-[rgb(178,178,178)]/20 rounded-2xl shadow-lg p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <p class="text-xs tracking-wide text-[rgb(178,178,178)]">{{ activeState.config.subtitle || 'Metraj' }}</p>
                <h3 class="text-2xl font-semibold text-[rgb(39,45,122)]">Metraj Tablosu</h3>
              </div>
              <div class="inline-flex items-center gap-2 rounded-full bg-[rgb(39,45,122)]/10 px-3 py-1.5 text-sm font-semibold text-[rgb(39,45,122)]">
                <Calculator :size="16" />
                Güncel Hesap
              </div>
            </div>

            <div class="grid divide-y divide-[rgb(178,178,178)]/20">
              <div
                v-for="item in resultsFor(activeState).value"
                :key="item.key"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3"
              >
                <div class="flex items-start">
                  <div>
                    <p class="text-base sm:text-lg font-semibold text-[rgb(39,45,122)]">{{ item.label }}</p>
                    <p class="text-sm text-[rgb(178,178,178)]" v-if="item.hint">{{ item.hint }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-2xl font-bold text-[rgb(39,45,122)]">
                    {{ formatValue(item.value, item.decimals) }}
                    <span class="text-base font-semibold text-[rgb(178,178,178)] ml-1">{{ item.unit }}</span>
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-4 flex items-start gap-3 rounded-xl bg-[rgb(39,45,122)]/5 px-4 py-3 text-sm text-[rgb(39,45,122)]/80 border border-[rgb(39,45,122)]/10">
              <AlertCircle :size="18" class="mt-0.5" />
              <p>Hesaplanan değerler bilgilendirme amaçlıdır; proje özelinde değişiklik gösterebilir.</p>
            </div>
          </div>

          <div class="bg-[rgb(39,45,122)]/5 border border-[rgb(39,45,122)]/15 rounded-2xl p-5 md:p-6" v-if="activeState.config.notes?.length">
            <div class="flex items-center gap-2 mb-3 text-[rgb(39,45,122)]">
              <Ruler :size="18" />
              <h4 class="text-lg font-semibold">Notlar</h4>
            </div>
            <ul class="space-y-2 text-sm md:text-base text-[rgb(39,45,122)]/80 leading-relaxed">
              <li v-for="(note, idx) in activeState.config.notes" :key="idx">{{ note }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { Calculator, AlertCircle, Ruler, SlidersHorizontal } from 'lucide-vue-next';
import { calculators, type CalculatorConfig, type CalculatorState } from '../data/calculators';

const calculatorStates = ref<CalculatorState[]>(
  calculators.map((config: CalculatorConfig) => {
    const inputs: Record<string, number> = {};
    config.inputs.forEach((input) => {
      inputs[input.key] = input.defaultValue ?? 0;
    });

    return {
      config,
      inputs: reactive(inputs),
      selectedVariantKey: config.defaultVariantKey ?? null, // YAML'de belirtilen varsayılan veya null
    };
  })
);
const activeId = ref(calculatorStates.value[0]?.config.id ?? '');
const activeState = computed(() => calculatorStates.value.find((s) => s.config.id === activeId.value) ?? null);

const formatValue = (value: number, decimals?: number) => {
  const safe = Number.isFinite(value) ? value : 0;
  const dynamicDecimals = decimals ?? (Number.isInteger(safe) ? 0 : 2);
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: dynamicDecimals,
    maximumFractionDigits: dynamicDecimals,
  }).format(safe);
};

const getActiveVariant = (state: CalculatorState) =>
  state.config.variants?.find((variant) => variant.key === state.selectedVariantKey);

const resultsFor = (state: CalculatorState) =>
  computed(() =>
    (() => {
      const variant = getActiveVariant(state);
      const items = variant?.items && variant.items.length > 0 ? variant.items : state.config.items;
      return items.map((item) => {
        const value = item.compute(state.inputs, variant);
        return {
          ...item,
          value: Number.isFinite(value) ? value : 0,
        };
      });
    })()
  );
</script>

