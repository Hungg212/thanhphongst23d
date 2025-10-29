'use client';

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { toast } from "react-hot-toast";

// --- Định nghĩa kiểu dữ liệu (Phải khớp với page.tsx) ---
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
  // Thêm các trường khác nếu cần
}

interface ProductCardProps {
  product: Product;
}

// --- Component ---
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Kiểm tra xem product và variants có tồn tại không
  if (!product || !product.variants || product.variants.length === 0) {
    console.warn(`ProductCard: Product or variants missing for product ID ${product?.id}`);
    return null; // Không hiển thị card nếu thiếu dữ liệu cơ bản
  }

  const defaultVariant = product.variants[0];

  // Hàm xử lý khi nhấn nút Thêm vào giỏ
  const handleAddToCart = () => {
    // Lấy thông tin cơ bản của product
    const productInfo = {
      id: product.id,
      name: product.name,
      brand: product.brand,
    };

    // Gọi action thêm vào giỏ hàng từ store
    addItem(productInfo, defaultVariant, 1);
    toast.success(`${product.name} (${defaultVariant.size}/${defaultVariant.color}) đã được thêm vào giỏ!`);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-h-4 aspect-w-3 overflow-hidden bg-gray-100">
          <Image
            // Sử dụng ảnh của defaultVariant, có fallback
            src={defaultVariant.image || '/placeholder-image.jpg'}
            alt={product.name}
            width={400}
            height={500}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            // Thêm onError để xử lý nếu ảnh lỗi
            onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }}
          />
        </div>
        <div className="p-4">
          {/* Hiển thị brand nếu có */}
          {product.brand && <p className="text-sm text-gray-500">{product.brand}</p>}
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          {/* Hiển thị giá của defaultVariant */}
          <p className="mt-2 text-base font-bold text-indigo-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(defaultVariant.price)}
          </p>
        </div>
      </Link>

      {/* Nút thêm vào giỏ */}
      <div className="border-t px-4 pb-4 pt-2"> {/* Điều chỉnh padding */}
        <button
          onClick={handleAddToCart}
          // Disable nút nếu stock = 0
          disabled={!defaultVariant || defaultVariant.stock === 0}
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400"
        >
          {defaultVariant && defaultVariant.stock > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
}