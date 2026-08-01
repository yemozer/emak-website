<template>
  <main class="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-[rgb(39,45,122)] mb-2">
          {{ pageHeading }}
        </h1>
        <p class="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{{ pageDescription }}</p>
      </div>

      <!-- Accounts -->
      <div class="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
        <div
          v-for="(acc, idx) in accounts"
          :key="idx"
          class="flex items-center gap-4 px-5 py-4"
        >
          <div class="text-base font-semibold text-[rgb(39,45,122)] flex-1 min-w-0">
            {{ acc.bank }}
          </div>
          <div class="text-sm tracking-wider text-gray-700 text-right flex-shrink-0">{{ acc.iban }}</div>
          <button
            type="button"
            @click="copy(acc.iban, idx)"
            class="text-xs font-semibold text-[rgb(39,45,122)] hover:underline flex-shrink-0"
          >
            {{ copiedIdx === idx ? '✓' : 'Kopyala' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Account = { bank: string; iban: string };

defineProps<{
  pageHeading: string;
  pageDescription: string;
  accountHolder: string;
  accounts: Account[];
}>();

const copiedIdx = ref<number | null>(null);

const copy = async (text: string, idx: number) => {
  try {
    await navigator.clipboard.writeText(text.replace(/\s/g, ''));
    copiedIdx.value = idx;
    setTimeout(() => {
      if (copiedIdx.value === idx) copiedIdx.value = null;
    }, 1500);
  } catch {}
};
</script>
