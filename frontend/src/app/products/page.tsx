// frontend/src/app/products/page.tsx
import { ProductCard } from "@/components/ProductCard";
import { Suspense } from "react";

// --- Định nghĩa kiểu dữ liệu ---
interface ProductVariant {
    id: number; productId: number; color: string; size: string; price: number; stock: number; image: string;
}
interface Product {
    id: number; name: string; brand: string; variants: ProductVariant[];
}

// --- Hàm gọi API lấy TẤT CẢ sản phẩm (ĐÃ BẬT LẠI) ---
async function getAllProducts(): Promise<Product[]> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_SERVER || 'http://backend:5000';
    const apiUrl = `${backendUrl}/api/products`; // Lấy hết sản phẩm
    console.log(`Fetching ALL products from: ${apiUrl}`);

    try {
        const res = await fetch(apiUrl, { cache: 'no-store' }); 
        if (!res.ok) {
            console.error(`Error fetching all products: ${res.status} ${res.statusText}`);
            const errorBody = await res.text();
            console.error("Error body:", errorBody);
            return [];
        }
        const data = await res.json();
        if (!data || !Array.isArray(data.data)) {
            console.error("Invalid data structure received from backend:", data);
            return [];
        }
        console.log(`Fetched ${data.data.length} products successfully.`);
        return data.data as Product[];
    } catch (error) {
        console.error("Network error fetching all products:", error);
        return [];
    }
}

// --- Component ProductList (Giữ nguyên) ---
async function AllProductList() {
    const products = await getAllProducts();
    if (!products || products.length === 0) {
        return <p className="text-center text-lg text-gray-500 py-10">Hiện không có sản phẩm nào.</p>
    }
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                product && product.id ? <ProductCard key={product.id} product={product} /> : null
            ))}
        </div>
    );
}

// --- Trang Sản phẩm (Page - Giữ nguyên) ---
export default function ProductsPage() {
    return (
        <main className="container mx-auto max-w-7xl px-4 py-8">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 text-center sm:text-4xl">
                Tất cả sản phẩm
            </h1>
            <Suspense fallback={<ProductGridSkeleton />}>
                <AllProductList />
            </Suspense>
        </main>
    );
}

// --- Component Skeleton (Giữ nguyên) ---
function ProductGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => ( // Hiển thị 12 skeleton
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
    );
}