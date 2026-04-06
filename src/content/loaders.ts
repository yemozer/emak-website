import yaml from 'js-yaml';

import heroYaml from './hero.yaml?raw';
import aboutYaml from './about.yaml?raw';
import aboutPreviewYaml from './about-preview.yaml?raw';
import servicesYaml from './services.yaml?raw';
import productsYaml from './products.yaml?raw';
import brandsYaml from './brands.yaml?raw';
import galleryYaml from './gallery.yaml?raw';
import contactYaml from './contact.yaml?raw';
import ctaYaml from './cta.yaml?raw';
import navigationYaml from './navigation.yaml?raw';
import companyInfoYaml from './company-info.yaml?raw';
import branchesYaml from './branches.yaml?raw';
import bankAccountsYaml from './bank-accounts.yaml?raw';
import footerYaml from './footer.yaml?raw';
import seoYaml from './seo.yaml?raw';

// --- Types ---

export type HeroContent = {
  heading: string;
  tagline: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_primary_external: boolean;
  cta_secondary_text: string;
  cta_secondary_text_mobile: string;
  cta_secondary_link: string;
  video_path: string;
};

export type KeyPoint = {
  icon: string;
  title: string;
  description: string;
};

export type AboutImage = {
  src: string;
  alt: string;
};

export type AboutContent = {
  page_heading: string;
  intro_paragraph_1: string;
  intro_paragraph_2: string;
  key_points: KeyPoint[];
  images: AboutImage[];
  vision_heading: string;
  vision_text: string;
  values_heading: string;
  values: string[];
  brand_partners_label: string;
  brand_partners_text: string;
};

export type AboutPreviewContent = {
  badge: string;
  heading: string;
  paragraph_1: string;
  paragraph_2: string;
  cta_text: string;
  cta_link: string;
  image: {
    src: string;
    alt: string;
    caption: string;
  };
};

export type ServiceItem = {
  name: string;
  icon: string;
  description: string;
  href: string;
  external: boolean;
};

export type ServicesContent = {
  section_badge: string;
  section_heading: string;
  section_description: string;
  services: ServiceItem[];
};

export type ProductCategory = {
  name: string;
  icon: string;
  description: string;
};

export type ProductsContent = {
  section_badge: string;
  section_heading: string;
  section_description: string;
  catalog_link: string;
  categories: ProductCategory[];
};

export type Brand = {
  name: string;
  logo: string;
  url: string;
};

export type BrandsContent = {
  section_heading: string;
  section_description: string;
  brands: Brand[];
};

export type GalleryItem = {
  src: string;
  alt: string;
  type: 'image' | 'video';
};

export type GalleryContent = {
  items: GalleryItem[];
};

export type PhoneEntry = {
  display: string;
  href: string;
};

export type ContactContent = {
  section_badge: string;
  section_heading: string;
  section_description: string;
  info_heading: string;
  address: {
    line1: string;
    line2: string;
  };
  phones: PhoneEntry[];
  email: {
    display: string;
    href: string;
  };
  social_heading: string;
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
    whatsapp: string;
  };
  google_maps_embed: string;
};

export type CTAContent = {
  heading: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
};

export type NavItem = {
  label: string;
  href: string;
  external: boolean;
  children?: NavItem[];
};

export type NavigationContent = {
  nav_items: NavItem[];
  b2b_button_text: string;
  b2b_button_link: string;
  cta_button_text: string;
  cta_button_link: string;
};

export type CompanyInfoItem = {
  label: string;
  value: string;
  icon?: string;
  href?: string;
};

export type CompanyInfoSection = {
  heading: string;
  items: CompanyInfoItem[];
};

export type CompanyInfoContent = {
  page_heading: string;
  page_description: string;
  sections: CompanyInfoSection[];
};

export type Branch = {
  name: string;
  company: string;
  type: string;
  address: string;
  phone?: string;
  image?: string;
  google_maps_embed?: string;
  maps_link?: string;
};

export type BranchesContent = {
  page_heading: string;
  page_description: string;
  branches: Branch[];
};

export type BankAccount = {
  bank: string;
  iban: string;
};

export type BankAccountsContent = {
  page_heading: string;
  page_description: string;
  account_holder: string;
  accounts: BankAccount[];
};

export type FooterLink = {
  label: string;
  href: string;
  external: boolean;
};

export type FooterContent = {
  company_name: string;
  company_description: string;
  logo: string;
  quick_links_heading: string;
  quick_links: FooterLink[];
  contact_heading: string;
  copyright: string;
};

export type PageSeo = {
  title: string;
  description: string;
  hero_heading?: string;
  hero_description?: string;
};

export type SeoContent = {
  default_title: string;
  default_description: string;
  pages: Record<string, PageSeo>;
};

// --- Loaders ---

function load<T>(raw: string): T {
  return yaml.load(raw) as T;
}

export const heroContent = load<HeroContent>(heroYaml);
export const aboutContent = load<AboutContent>(aboutYaml);
export const aboutPreviewContent = load<AboutPreviewContent>(aboutPreviewYaml);
export const servicesContent = load<ServicesContent>(servicesYaml);
export const productsContent = load<ProductsContent>(productsYaml);
export const brandsContent = load<BrandsContent>(brandsYaml);
export const galleryContent = load<GalleryContent>(galleryYaml);
export const contactContent = load<ContactContent>(contactYaml);
export const ctaContent = load<CTAContent>(ctaYaml);
export const navigationContent = load<NavigationContent>(navigationYaml);
export const companyInfoContent = load<CompanyInfoContent>(companyInfoYaml);
export const branchesContent = load<BranchesContent>(branchesYaml);
export const bankAccountsContent = load<BankAccountsContent>(bankAccountsYaml);
export const footerContent = load<FooterContent>(footerYaml);
export const seoContent = load<SeoContent>(seoYaml);
