<template>
  <main class="pt-24 md:pt-28 pb-16 bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-[rgb(39,45,122)] mb-2">
          {{ pageHeading }}
        </h1>
        <p class="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{{ pageDescription }}</p>
      </div>

      <!-- Sections -->
      <div class="space-y-6">
        <div
          v-for="(section, idx) in sections"
          :key="idx"
          class="bg-white rounded-xl border border-gray-100"
        >
          <div class="px-5 py-3 border-b border-gray-100">
            <h2 class="text-lg md:text-xl font-semibold text-[rgb(39,45,122)]">
              {{ section.heading }}
            </h2>
          </div>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            <div
              v-for="(item, i) in section.items"
              :key="i"
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 px-5 py-2.5 border-b border-gray-50 last:border-b-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-b-0"
            >
              <dt class="flex items-center gap-2 text-xs text-gray-500 font-medium sm:pt-0.5 sm:flex-shrink-0">
                <component
                  :is="iconMap[item.icon]"
                  v-if="item.icon && iconMap[item.icon]"
                  :size="14"
                  class="text-[rgb(39,45,122)] flex-shrink-0"
                />
                {{ item.label }}
              </dt>
              <a
                v-if="item.href"
                :href="item.href"
                v-bind="linkAttrs(item.href)"
                class="text-sm text-[rgb(39,45,122)] font-medium sm:text-right break-words hover:underline"
              >
                {{ item.value }}
              </a>
              <dd
                v-else
                class="text-sm text-gray-900 font-medium sm:text-right break-words"
              >
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- Documents -->
        <div
          v-if="visibleDocuments.length"
          class="bg-white rounded-xl border border-gray-100"
        >
          <div class="px-5 py-3 border-b border-gray-100">
            <h2 class="text-lg md:text-xl font-semibold text-[rgb(39,45,122)]">
              {{ documentsHeading || 'Belgeler' }}
            </h2>
          </div>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 p-5">
            <li v-for="(doc, i) in visibleDocuments" :key="i">
              <a
                :href="doc.link"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:border-[rgb(39,45,122)]/30 hover:bg-[rgb(39,45,122)]/5"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgb(39,45,122)]/5 text-[rgb(39,45,122)] transition-colors group-hover:bg-[rgb(39,45,122)] group-hover:text-white">
                  <FileText :size="18" />
                </span>
                <span class="flex-1 text-sm font-medium text-gray-900 group-hover:text-[rgb(39,45,122)] break-words">
                  {{ doc.name }}
                </span>
                <ExternalLink :size="16" class="shrink-0 text-gray-400 group-hover:text-[rgb(39,45,122)]" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FileText, ExternalLink } from 'lucide-vue-next';
import { iconMap } from '../lib/icon-map';

type Item = { label: string; value: string; icon?: string; href?: string };
type Section = { heading: string; items: Item[] };
type Document = { name: string; file?: string; url?: string };

const props = defineProps<{
  pageHeading: string;
  pageDescription: string;
  sections: Section[];
  documentsHeading?: string;
  documents?: Document[];
}>();

// tel:/mailto: hand off to the phone/mail app, so a new tab would just be left blank.
const linkAttrs = (href: string) =>
  /^(tel|mailto):/i.test(href) ? {} : { target: '_blank', rel: 'noopener noreferrer' };

// An uploaded file takes precedence over a pasted link.
const visibleDocuments = computed(() =>
  (props.documents ?? [])
    .map((doc) => ({ name: doc.name, link: doc.file || doc.url }))
    .filter((doc): doc is { name: string; link: string } => Boolean(doc.name && doc.link))
);
</script>
