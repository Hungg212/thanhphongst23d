// frontend/src/app/cart/page.tsx
'use client'; // Đây là Client Component vì cần đọc state từ Zustand

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  // Lấy state và actions từ store
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  const total = getCartTotal();

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-gray-900">
        Giỏ hàng của bạn 🛒
      </h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Giỏ hàng của bạn đang trống.</p>
          <Link href="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Danh sách sản phẩm trong giỏ */}
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {items.map((item) => (
              <li key={item.variant.id} className="flex items-center py-6">
                <Image
                  src={item.variant.image || '/placeholder-image.jpg'}
                  alt={item.product.name}
                  width={80}
                  height={100}
                  className="h-24 w-20 rounded-md object-cover"
                  onError={(e) => { e.currentTarget.src = '/placeholder-image.jpg'; }}
                />
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link href={`/product/${item.product.id}`}>
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="ml-4">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.variant.price * item.quantity)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.variant.color} / {item.variant.size}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        // (Thêm disable nếu vượt quá stock sau này)
                      >
                        +
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => removeItem(item.variant.id)}
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Tổng tiền và nút Checkout */}
          <div className="text-right">
            <div className="text-base font-medium text-gray-900">
              Tổng cộng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Phí vận chuyển sẽ được tính ở bước thanh toán.</p>
            <div className="mt-6">
              <Link
                href="/checkout" // (Chúng ta sẽ tạo trang checkout sau)
                className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Tiến hành thanh toán
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                hoặc{' '}
                <Link href="/products" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Tiếp tục mua sắm
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}