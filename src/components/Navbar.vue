<template>
  <nav
    class="fixed top-0 z-50 w-full transition-all duration-300"
    :class="shouldShowTransparent ? (scrolled ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-white shadow-md'"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 md:h-20 items-center justify-between">
        <!-- Logo -->
        <a
          href="/"
          class="group flex items-center transition-all duration-300 flex-shrink-0"
        >
          <img
            src="/emak-logo.png"
            alt="Emak Yapı"
            class="h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
            :class="shouldShowTransparent && !scrolled
              ? 'brightness-125 contrast-125 drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]'
              : 'brightness-100 drop-shadow-none'"
            :style="shouldShowTransparent && !scrolled ? 'filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));' : ''"
          />
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex lg:items-center lg:gap-6 absolute left-1/2 transform -translate-x-1/2">
          <template v-for="item in navItems" :key="item.href">
            <div
              v-if="item.children && item.children.length"
              class="group relative"
            >
              <span
                class="relative text-sm font-medium transition-colors cursor-pointer inline-flex items-center gap-1"
                :class="[
                  shouldShowTransparent && !scrolled
                    ? 'text-white hover:text-white/80'
                    : 'text-[rgb(39,45,122)] hover:text-[rgb(39,45,122)]/70',
                  isChildActive(item) ? 'font-semibold' : ''
                ]"
              >
                {{ item.label }}
                <svg class="h-3 w-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                <span
                  class="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                  :class="[
                    isChildActive(item) ? 'w-full' : 'w-0 group-hover:w-full',
                    shouldShowTransparent && !scrolled ? 'bg-white' : 'bg-[rgb(39,45,122)]'
                  ]"
                ></span>
              </span>
              <div
                class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
              >
                <div class="min-w-[200px] rounded-lg bg-white shadow-xl border border-gray-100 py-2">
                  <a
                    v-for="child in item.children"
                    :key="child.href"
                    :href="child.href"
                    :target="child.external ? '_blank' : undefined"
                    :rel="child.external ? 'noopener noreferrer' : undefined"
                    class="block px-4 py-2.5 text-sm text-[rgb(39,45,122)] hover:bg-[rgb(39,45,122)]/10 transition-colors whitespace-nowrap"
                    :class="isCurrentPage(child.href) ? 'font-semibold bg-[rgb(39,45,122)]/5' : ''"
                  >
                    {{ child.label }}
                  </a>
                </div>
              </div>
            </div>
            <a
              v-else-if="item.external || !isCurrentPage(item.href)"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              class="group relative text-sm font-medium transition-colors"
              :class="shouldShowTransparent && !scrolled
                ? 'text-white hover:text-white/80'
                : 'text-[rgb(39,45,122)] hover:text-[rgb(39,45,122)]/70'"
            >
              {{ item.label }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                :class="shouldShowTransparent && !scrolled
                  ? 'bg-white'
                  : 'bg-[rgb(39,45,122)]'"
              ></span>
            </a>
            <span
              v-else
              class="relative text-sm font-semibold"
              :class="shouldShowTransparent && !scrolled
                ? 'text-white'
                : 'text-[rgb(39,45,122)]'"
            >
              {{ item.label }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 w-full"
                :class="shouldShowTransparent && !scrolled
                  ? 'bg-white'
                  : 'bg-[rgb(39,45,122)]'"
              ></span>
            </span>
          </template>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex lg:items-center lg:gap-3 flex-shrink-0">
          <a
            :href="b2bButtonLink"
            target="_blank"
            rel="noopener noreferrer"
            class="navbar-cta-button rounded-lg px-5 py-2.5 text-sm font-semibold shadow-lg border-2 transition-all"
            :class="shouldShowTransparent && !scrolled
              ? 'bg-transparent border-white text-white hover:bg-white/10'
              : 'bg-transparent border-[rgb(39,45,122)] text-[rgb(39,45,122)] hover:bg-[rgb(39,45,122)]/10'"
          >
            {{ b2bButtonText }}
          </a>
          <a
            :href="ctaButtonLink"
            class="navbar-cta-button rounded-lg px-6 py-2.5 text-sm font-semibold shadow-lg"
            :class="shouldShowTransparent && !scrolled
              ? 'bg-white text-[rgb(39,45,122)] hover:bg-white/90'
              : 'bg-[rgb(39,45,122)] text-white hover:bg-[rgb(39,45,122)]/90'"
          >
            {{ ctaButtonText }}
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 transition-colors"
          :class="shouldShowTransparent && !scrolled ? 'text-white' : 'text-[rgb(39,45,122)]'"
          aria-label="Toggle menu"
        >
          <div class="relative h-5 w-6">
            <span
              class="absolute left-0 top-0 h-0.5 w-6 rounded-full transition-all duration-300"
              :class="mobileMenuOpen ? 'top-2 rotate-45' : ''"
              :style="{ backgroundColor: shouldShowTransparent && !scrolled ? 'white' : 'rgb(39,45,122)' }"
            ></span>
            <span
              class="absolute left-0 top-2 h-0.5 w-6 rounded-full transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-0' : 'opacity-100'"
              :style="{ backgroundColor: shouldShowTransparent && !scrolled ? 'white' : 'rgb(39,45,122)' }"
            ></span>
            <span
              class="absolute left-0 top-2 h-0.5 w-6 rounded-full transition-all duration-300"
              :class="mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'"
              :style="{ backgroundColor: shouldShowTransparent && !scrolled ? 'white' : 'rgb(39,45,122)' }"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden border-t bg-white"
      >
        <div class="container mx-auto flex flex-col gap-1 px-6 py-4">
          <template v-for="item in navItems" :key="item.href">
            <template v-if="item.children && item.children.length">
              <div class="px-4 py-2 text-xs font-bold uppercase tracking-wide text-[rgb(39,45,122)]/60">
                {{ item.label }}
              </div>
              <a
                v-for="child in item.children"
                :key="child.href"
                :href="child.href"
                :target="child.external ? '_blank' : undefined"
                :rel="child.external ? 'noopener noreferrer' : undefined"
                @click="mobileMenuOpen = false"
                class="rounded-lg pl-8 pr-4 py-3 text-base font-medium text-[rgb(39,45,122)] transition-colors hover:bg-[rgb(39,45,122)]/10"
              >
                {{ child.label }}
              </a>
            </template>
            <a
              v-else-if="item.external || !isCurrentPage(item.href)"
              :href="item.href"
              :target="item.external ? '_blank' : undefined"
              :rel="item.external ? 'noopener noreferrer' : undefined"
              @click="mobileMenuOpen = false"
              class="rounded-lg px-4 py-3 text-base font-medium text-[rgb(39,45,122)] transition-colors hover:bg-[rgb(39,45,122)]/10"
            >
              {{ item.label }}
            </a>
            <span
              v-else
              class="rounded-lg px-4 py-3 text-base font-semibold text-[rgb(39,45,122)] bg-[rgb(39,45,122)]/10"
            >
              {{ item.label }}
            </span>
          </template>
          <a
            :href="b2bButtonLink"
            target="_blank"
            rel="noopener noreferrer"
            @click="mobileMenuOpen = false"
            class="rounded-lg border-2 border-[rgb(39,45,122)] bg-transparent px-4 py-3 text-center text-base font-semibold text-[rgb(39,45,122)] transition-colors hover:bg-[rgb(39,45,122)]/10"
          >
            {{ b2bButtonText }}
          </a>
          <a
            :href="ctaButtonLink"
            @click="mobileMenuOpen = false"
            class="mt-2 rounded-lg bg-[rgb(39,45,122)] px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-[rgb(39,45,122)]/90"
          >
            {{ ctaButtonText }}
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const shouldShowTransparent = ref(false);
const currentPath = ref('');

type NavItem = { label: string; href: string; external: boolean; children?: NavItem[] };

defineProps<{
  navItems: NavItem[];
  b2bButtonText: string;
  b2bButtonLink: string;
  ctaButtonText: string;
  ctaButtonLink: string;
}>();

const isCurrentPage = (href: string) => {
  if (typeof window === 'undefined') return false;

  if (href.startsWith('/#')) {
    return currentPath.value === '/' || currentPath.value === '/index.html';
  }

  return currentPath.value === href;
};

const isChildActive = (item: NavItem) => {
  return item.children?.some((c) => isCurrentPage(c.href)) ?? false;
};

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    currentPath.value = window.location.pathname;

    const isHomePage = currentPath.value === '/' || currentPath.value === '/index.html';
    shouldShowTransparent.value = isHomePage;

    if (!isHomePage) {
      scrolled.value = true;
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.navbar-cta-button {
  transition: background-color 0.3s ease-in-out,
              box-shadow 0.3s ease-in-out,
              transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  transform: scale(1) !important;
  will-change: transform;
  display: inline-block;
}

.navbar-cta-button:hover {
  transform: scale(1.05) !important;
}
</style>
