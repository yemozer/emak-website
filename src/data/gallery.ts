export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  type: 'image' | 'video';
}

export const galleryItems: GalleryItem[] = [
  // Building exteriors
  { id: 1, src: '/images/gallery/building-exterior-01.jpg', alt: 'Emak Yapı bina ve depo dış görünüm', type: 'image' },
  { id: 2, src: '/images/gallery/building-exterior-02.jpg', alt: 'Emak Yapı bina dış görünüm', type: 'image' },
  { id: 3, src: '/images/gallery/building-exterior-03.jpg', alt: 'Emak Yapı bina cephesi', type: 'image' },
  { id: 4, src: '/images/gallery/building-exterior-04.jpg', alt: 'Emak Yapı bina ve depo girişi', type: 'image' },
  { id: 5, src: '/images/gallery/building-exterior-05.jpg', alt: 'Emak Yapı bina genel görünüm', type: 'image' },

  // Warehouse interiors
  { id: 6, src: '/images/gallery/warehouse-interior-01.jpg', alt: 'Emak Yapı depo iç görünüm - geniş stok alanı', type: 'image' },
  { id: 7, src: '/images/gallery/warehouse-interior-02.jpg', alt: 'Emak Yapı depo iç görünüm - yalıtım malzemeleri', type: 'image' },
  { id: 8, src: '/images/gallery/warehouse-interior-03.jpg', alt: 'Emak Yapı depo iç görünüm - ürün stokları', type: 'image' },
  { id: 9, src: '/images/gallery/warehouse-interior-04.jpg', alt: 'Emak Yapı depo iç görünüm - İzocam ürünleri', type: 'image' },
  { id: 10, src: '/images/gallery/warehouse-interior-05.jpg', alt: 'Emak Yapı depo iç görünüm - paletli ürünler', type: 'image' },
  { id: 11, src: '/images/gallery/warehouse-interior-06.jpg', alt: 'Emak Yapı depo iç görünüm - Bonus XPS ürünleri', type: 'image' },
  { id: 12, src: '/images/gallery/warehouse-interior-07.jpg', alt: 'Emak Yapı depo iç görünüm - yalıtım ruloları', type: 'image' },

  // Warehouse products
  { id: 13, src: '/images/gallery/warehouse-products-01.jpg', alt: 'Emak Yapı ürün stok - TerraWool yalıtım', type: 'image' },
  { id: 14, src: '/images/gallery/warehouse-products-02.jpg', alt: 'Emak Yapı ürün stok - Dalsan paneller', type: 'image' },
  { id: 15, src: '/images/gallery/warehouse-products-03.jpg', alt: 'Emak Yapı ürün stok - TerraWool paketleri', type: 'image' },
  { id: 16, src: '/images/gallery/warehouse-products-04.jpg', alt: 'Emak Yapı ürün stok - Allwool yalıtım', type: 'image' },
  { id: 17, src: '/images/gallery/warehouse-products-05.jpg', alt: 'Emak Yapı ürün stok - TerraWool kutuları', type: 'image' },
  { id: 18, src: '/images/gallery/warehouse-products-06.jpg', alt: 'Emak Yapı ürün stok - bitüm membran ruloları', type: 'image' },
  { id: 19, src: '/images/gallery/warehouse-products-07.jpg', alt: 'Emak Yapı ürün stok - İzocam levhalar', type: 'image' },

  // Videos
  { id: 20, src: '/images/gallery/warehouse-video-01.mp4', alt: 'Emak Yapı depo tanıtım videosu 1', type: 'video' },
  { id: 21, src: '/images/gallery/warehouse-video-02.mp4', alt: 'Emak Yapı depo tanıtım videosu 2', type: 'video' },
  { id: 22, src: '/images/gallery/warehouse-video-03.mp4', alt: 'Emak Yapı depo tanıtım videosu 3', type: 'video' },
  { id: 23, src: '/images/gallery/warehouse-video-04.mp4', alt: 'Emak Yapı depo tanıtım videosu 4', type: 'video' },
  { id: 24, src: '/images/gallery/warehouse-video-05.mp4', alt: 'Emak Yapı depo tanıtım videosu 5', type: 'video' },
];
