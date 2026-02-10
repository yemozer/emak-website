<template>
  <footer class="border-t border-[rgb(178,178,178)]/20 bg-gradient-muted py-4 md:py-12 lg:py-16">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid gap-4 md:gap-10 lg:gap-12 grid-cols-2 md:grid-cols-3">
        <!-- Company Info -->
        <div class="col-span-2 md:col-span-1">
          <div class="mb-2 md:mb-6 flex items-center gap-2 md:gap-3">
            <img
              :src="logo"
              alt="Emak Yapı Logo"
              class="h-6 md:h-10 w-auto object-contain"
            />
            <h3 class="text-lg md:text-2xl font-bold text-[rgb(39,45,122)]">{{ companyName }}</h3>
          </div>
          <p class="mb-3 md:mb-8 text-[10px] md:text-sm text-[rgb(178,178,178)] leading-tight md:leading-relaxed">
            {{ companyDescription }}
          </p>
          <div class="flex gap-2 md:gap-4">
            <a
              :href="social.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
              aria-label="Instagram"
            >
              <Instagram :size="14" class="md:w-5 md:h-5" />
            </a>
            <a
              :href="social.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin :size="14" class="md:w-5 md:h-5" />
            </a>
            <a
              :href="social.facebook"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[rgb(39,45,122)] hover:text-white hover:shadow-lg active:scale-95"
              aria-label="Facebook"
            >
              <Facebook :size="14" class="md:w-5 md:h-5" />
            </a>
            <a
              :href="social.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-lg md:rounded-xl border border-[rgb(178,178,178)]/20 bg-white transition-all hover:bg-[#25D366] hover:text-white hover:shadow-lg active:scale-95"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 md:w-5 md:h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="mb-2 md:mb-6 text-xs md:text-lg font-semibold text-[rgb(39,45,122)]">{{ quickLinksHeading }}</h4>
          <ul class="space-y-1 md:space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="text-[10px] md:text-sm text-[rgb(178,178,178)] transition-colors hover:text-[rgb(39,45,122)]"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="mb-2 md:mb-6 text-xs md:text-lg font-semibold text-[rgb(39,45,122)]">{{ contactHeading }}</h4>
          <ul class="space-y-1.5 md:space-y-4 text-[10px] md:text-sm text-[rgb(178,178,178)]">
            <li class="flex items-start gap-1.5 md:gap-3">
              <MapPin :size="12" class="md:w-[18px] md:h-[18px] mt-0.5 text-[rgb(39,45,122)] flex-shrink-0" />
              <span class="leading-tight">{{ address.line1 }}<br />{{ address.line2 }}</span>
            </li>
            <li class="flex items-center gap-1.5 md:gap-3">
              <Phone :size="12" class="md:w-[18px] md:h-[18px] text-[rgb(39,45,122)] flex-shrink-0" />
              <div class="space-y-0.5 md:space-y-1">
                <a v-for="phone in phones" :key="phone.href" :href="phone.href" class="block hover:text-[rgb(39,45,122)] transition-colors">
                  {{ phone.display }}
                </a>
              </div>
            </li>
            <li class="flex items-center gap-1.5 md:gap-3">
              <Mail :size="12" class="md:w-[18px] md:h-[18px] text-[rgb(39,45,122)] flex-shrink-0" />
              <a :href="email.href" class="hover:text-[rgb(39,45,122)] transition-colors break-all">
                {{ email.display }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4 md:mt-12 border-t border-[rgb(178,178,178)]/20 pt-3 md:pt-8">
        <div class="flex flex-col items-center justify-center gap-2 md:gap-3 text-center">
          <p class="text-[10px] md:text-sm text-[rgb(178,178,178)] px-4">
            &copy; {{ copyright }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-vue-next';

defineProps<{
  companyName: string;
  companyDescription: string;
  logo: string;
  quickLinksHeading: string;
  quickLinks: { label: string; href: string; external: boolean }[];
  contactHeading: string;
  copyright: string;
  address: { line1: string; line2: string };
  phones: { display: string; href: string }[];
  email: { display: string; href: string };
  social: { instagram: string; linkedin: string; facebook: string; whatsapp: string };
}>();
</script>
