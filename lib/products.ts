import creedAventus from '../public/images/perfume/creed-aventus.png';
import driftAura from '../public/images/perfume/drift-aura.png';
import gucciRuch from '../public/images/perfume/gucci-ruch.png';
import oud from '../public/images/perfume/oud.png';
import { StaticImageData } from 'next/image';

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string | StaticImageData;
  rating: number;
  reviews: number;
  size: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  shippingFee: number;
};

export const products: Product[] = [
  {
    id: "afnan-9pm-elixir",
    name: "Afnan 9PM Elixir 100ML EDP",
    brand: "Afnan", price: 12000,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    rating: 5, reviews: 0, size: "100ML",
    topNotes: "Cardamom, Nutmeg, and Ilemi",
    heartNotes: "Pimento, Leather, and Lavender",
    baseNotes: "Vanilla, Patchouli, Labdanum, and Rock rose",
    category: "men", inStock: true, stockCount: 4, shippingFee: 0,
  },
  {
    id: "afnan-9pm-rebel",
    name: "Afnan 9PM Rebel 100ML EDP",
    brand: "Afnan", price: 11000,
    image: creedAventus,
    rating: 5, reviews: 2, size: "100ML",
    topNotes: "Bergamot, Grapefruit",
    heartNotes: "Rose, Jasmine",
    baseNotes: "Musk, Amber, Sandalwood",
    category: "men", inStock: true, stockCount: 8, shippingFee: 0,
  },
  {
    id: "afnan-supremacy-collector",
    name: "Afnan Supremacy Collector's Edition 100ML EDP",
    brand: "Afnan", price: 10500,
    image: oud,
    rating: 5, reviews: 2, size: "100ML",
    topNotes: "Bergamot, Lemon",
    heartNotes: "Rose, Oud",
    baseNotes: "Musk, Amber",
    category: "unisex", inStock: true, stockCount: 6, shippingFee: 0,
  },
  {
    id: "afnan-supremacy-intense",
    name: "Afnan Supremacy Not Only Intense Men 100ML Extrait",
    brand: "Afnan", price: 10000,
    image: driftAura,
    rating: 5, reviews: 0, size: "100ML",
    topNotes: "Spices, Pepper",
    heartNotes: "Leather, Tobacco",
    baseNotes: "Oud, Sandalwood, Musk",
    category: "men", inStock: true, stockCount: 3, shippingFee: 0,
  },
  {
    id: "ahmed-hayana",
    name: "Ahmed Al Maghribi Hayana EDP 100ML",
    brand: "Ahmed Al Maghribi", price: 7300,
    image: gucciRuch,
    rating: 5, reviews: 0, size: "100ML",
    topNotes: "Citrus, Bergamot",
    heartNotes: "Rose, Jasmine",
    baseNotes: "Musk, Amber",
    category: "women", inStock: true, stockCount: 10, shippingFee: 0,
  },
  {
    id: "ahmed-joud",
    name: "Ahmed Al Maghribi Joud EDP 100ML",
    brand: "Ahmed Al Maghribi", price: 7300,
    image: oud,
    rating: 5, reviews: 0, size: "100ML",
    topNotes: "Oud, Saffron",
    heartNotes: "Rose, Patchouli",
    baseNotes: "Amber, Musk",
    category: "unisex", inStock: true, stockCount: 5, shippingFee: 0,
  },
  {
    id: "ahmed-laathani",
    name: "Ahmed Al Maghribi Laathani EDP 80ML",
    brand: "Ahmed Al Maghribi", price: 15550,
    image: creedAventus,
    rating: 5, reviews: 0, size: "80ML",
    topNotes: "Saffron, Oud",
    heartNotes: "Rose, Amber",
    baseNotes: "Sandalwood, Musk",
    category: "unisex", inStock: true, stockCount: 2, shippingFee: 0,
  },
  {
    id: "ahmed-marj",
    name: "Ahmed Al Maghribi Marj EDP 60ML",
    brand: "Ahmed Al Maghribi", price: 16400,
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?w=400&q=80",
    rating: 5, reviews: 0, size: "60ML",
    topNotes: "Floral, Citrus",
    heartNotes: "Iris, Jasmine",
    baseNotes: "Musk, Cedarwood",
    category: "women", inStock: true, stockCount: 4, shippingFee: 0,
  },
  {
    id: "lattafa-angham",
    name: "Lattafa Angham EDP 100ML",
    brand: "Lattafa", price: 7330,
    image: driftAura,
    rating: 5, reviews: 6, size: "100ML",
    topNotes: "Saffron, Bergamot",
    heartNotes: "Rose, Oud",
    baseNotes: "Amber, Musk, Sandalwood",
    category: "unisex", inStock: true, stockCount: 12, shippingFee: 0,
  },
  {
    id: "lattafa-mayar",
    name: "Lattafa Mayar Cherry Intense 100ML",
    brand: "Lattafa", price: 5580,
    image: gucciRuch,
    rating: 5, reviews: 2, size: "100ML",
    topNotes: "Cherry, Bergamot",
    heartNotes: "Rose, Jasmine",
    baseNotes: "Vanilla, Musk",
    category: "women", inStock: true, stockCount: 9, shippingFee: 0,
  },
  {
    id: "dior-sauvage",
    name: "Dior Sauvage Elixir 60ML",
    brand: "Dior", price: 19800,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    rating: 5, reviews: 5, size: "60ML",
    topNotes: "Grapefruit, Pepper",
    heartNotes: "Lavender, Geranium",
    baseNotes: "Ambroxan, Cedarwood",
    category: "men", inStock: true, stockCount: 3, shippingFee: 0,
  },
  {
    id: "creed-aventus",
    name: "Creed Aventus 100ML EDP",
    brand: "Creed", price: 45000,
    image: creedAventus,
    rating: 5, reviews: 8, size: "100ML",
    topNotes: "Pineapple, Bergamot, Apple",
    heartNotes: "Rose, Jasmine, Patchouli",
    baseNotes: "Musk, Oakmoss, Ambergris",
    category: "men", inStock: true, stockCount: 2, shippingFee: 0,
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (id: string, limit = 4): Product[] =>
  products.filter((p) => p.id !== id).slice(0, limit);
