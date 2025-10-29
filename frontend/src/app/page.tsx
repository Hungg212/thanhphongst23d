// frontend/src/app/page.tsx
import { ProductCard } from "@/components/ProductCard";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component

// --- Định nghĩa kiểu dữ liệu ---
interface ProductVariant {
  id: number;
  productId: number;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}
interface Product {
  id: number;
  name: string;
  brand: string;
  variants: ProductVariant[];
}
interface Category { 
  id: number;
  name: string;
}

// ---------------------------------------------------
// --- HÀM GỌI API GỐC (ĐÃ BẬT LẠI) ---
// ---------------------------------------------------

// --- Hàm gọi API lấy Sản phẩm Mới Nhất ---
async function getNewProducts(): Promise<Product[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER || 'http://backend:5000';
  const apiUrl = `${backendUrl}/api/products?limit=8`; // Lấy 8 sản phẩm mới nhất
  console.log(`Fetching NEW products from: ${apiUrl}`);
  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } }); // Cache 60s
    if (!res.ok) {
      console.error(`Error fetching new products: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    if (!data || !Array.isArray(data.data)) { return []; }
    console.log(`Fetched ${data.data.length} new products successfully.`);
    return data.data as Product[];
  } catch (error) {
    console.error("Network error fetching new products:", error);
    return [];
  }
}

// --- Hàm gọi API lấy Danh mục ---
async function getCategories(): Promise<Category[]> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER || 'http://backend:5000';
  const apiUrl = `${backendUrl}/api/categories`;
  console.log(`Fetching categories from: ${apiUrl}`);
  try {
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } }); // Cache 1 giờ
    if (!res.ok) {
      console.error(`Error fetching categories: ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
     if (!data || !Array.isArray(data.data)) { return []; }
    console.log(`Fetched ${data.data.length} categories successfully.`);
    return data.data as Category[];
  } catch (error) {
    console.error("Network error fetching categories:", error);
    return [];
  }
}

// ---------------------------------------------------
// --- COMPONENTS SỬ DỤNG HÀM TRÊN (GIỮ NGUYÊN LOGIC) ---
// ---------------------------------------------------

// --- Component Section Danh mục ---
async function CategoriesSection() {
    const categories = await getCategories();
    if (categories.length === 0) return null;

    const categoryImages: { [key: string]: string } = {
        'Áo T-shirt': 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=80/uploads/July2023/t-shirt-co-tron-coolmate-basics-den_61.jpg',
        'Áo Sơ mi': 'https://pos.nvncdn.com/be3159-662/ps/20240325_B9g9K9t963.jpeg',
        'Quần Jeans': 'https://static.zara.net/photos///2024/V/0/2/p/5520/400/406/2/w/563/5520400406_6_1_1.jpg?ts=1708682089405',
    };

    return (
        <section className="bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-8">
            Khám phá Danh mục
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
                <Link
                key={category.id}
                href={`/products?category=${category.id}`} 
                className="group relative block overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
                >
                <Image
                    src={categoryImages[category.name] || '/placeholder-image.jpg'}
                    alt={category.name}
                    width={400}
                    height={500}
                    className="h-64 w-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                    <h3 className="text-xl font-semibold text-white text-center">
                    {category.name}
                    </h3>
                </div>
                </Link>
            ))}
            </div>
        </div>
        </section>
    );
}


// --- Component Section Sản phẩm Mới ---
async function NewProductsSection() {
    const products = await getNewProducts();
    
    if (products.length === 0) {
        return (
             <section className="container mx-auto max-w-7xl px-4 py-12 sm:py-16 text-center">
                <p className="text-lg text-gray-500 py-10">Hiện không có sản phẩm nào.</p>
                <Link href="/products" className="text-indigo-600 hover:underline font-medium">
                    Xem tất cả sản phẩm &rarr;
                </Link>
            </section>
        );
    }
    
    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 text-center">
            Hàng Mới Về 🔥
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
            <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <div className="mt-10 text-center">
            <Link href="/products" className="text-indigo-600 hover:underline font-medium">
            Xem tất cả sản phẩm &rarr;
            </Link>
        </div>
        </section>
    );
}

// --- Trang chủ (Page - Cập nhật) ---
export default function HomePage() {
    return (
        <>
        {/* Section Hero Banner */}
        <section className="relative h-[60vh] min-h-[400px] bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-center px-4">
            <div className="relative z-10">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
                    Phong cách Mới, Cuộc sống Mới
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100 drop-shadow">
                    Khám phá bộ sưu tập thời trang mới nhất và định hình phong cách riêng của bạn.
                </p>
                <div className="mt-10">
                    <Link
                    href="/products"
                    className="rounded-md bg-white px-8 py-3 text-base font-medium text-indigo-600 shadow-lg transition-transform hover:scale-105 hover:bg-indigo-50"
                    >
                    Mua sắm ngay
                    </Link>
                </div>
            </div>
        </section>

        {/* Section Danh mục */}
        <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesSection />
        </Suspense>

        {/* Section Sản phẩm Mới */}
        <Suspense fallback={<ProductGridSkeleton />}>
            <NewProductsSection />
        </Suspense>
        </>
    );
}

// --- Component Skeletons ---
function CategoriesSkeleton() {
    return (
        <section className="bg-gray-100 py-12 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="h-8 w-1/3 mx-auto bg-gray-300 rounded mb-8 animate-pulse"></div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded-lg animate-pulse"></div>
            ))}
            </div>
        </div>
        </section>
    );
}

function ProductGridSkeleton() {
    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="h-8 w-1/3 mx-auto bg-gray-300 rounded mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => ( // Hiển thị 8 skeleton
            <div key={i} className="animate-pulse rounded-lg border bg-white shadow-sm">
                <div className="aspect-h-4 aspect-w-3 w-full bg-gray-200"></div>
                <div className="p-4">
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="mt-2 h-5 w-3/4 rounded bg-gray-200"></div>
                <div className="mt-4 h-6 w-1/4 rounded bg-gray-200"></div>
                <div className="mt-4 h-10 w-full rounded-md bg-gray-200"></div>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
}