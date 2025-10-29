import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Dùng để lưu giỏ hàng vào localStorage

// Định nghĩa kiểu dữ liệu cho Variant
// (Nó phải khớp với dữ liệu từ backend trả về)
interface ProductVariant {
  id: number;
  productId: number;
  color: string;
  size: string;
  price: number;
  stock: number;
  image: string;
}

// Định nghĩa kiểu dữ liệu cho sản phẩm (thông tin chung)
interface Product {
  id: number;
  name: string;
  brand: string;
}

// Định nghĩa item trong giỏ hàng
export interface CartItem {
  product: Product; // Thông tin chung
  variant: ProductVariant; // Biến thể đã chọn
  quantity: number;
}

// Định nghĩa State và Actions của store
interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
}

// --- Tạo store ---
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Khởi tạo giỏ hàng rỗng

      // --- ACTIONS ---
      addItem: (product, variant, quantity) => {
        const { items } = get();
        const existingItem = items.find(item => item.variant.id === variant.id);

        if (existingItem) {
          // Nếu đã có, cập nhật số lượng
          set({
            items: items.map(item =>
              item.variant.id === variant.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Nếu chưa có, thêm mới
          set({ items: [...items, { product, variant, quantity }] });
        }
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variant.id !== variantId),
        });
      },

      updateQuantity: (variantId, quantity) => {
        set({
          items: get().items
            .map(item =>
              item.variant.id === variantId
                ? { ...item, quantity: Math.max(0, quantity) } // Đảm bảo số lượng không âm
                : item
            )
            .filter(item => item.quantity > 0), // Xóa nếu số lượng = 0
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      // --- GETTERS (Selectors) ---
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'clothing-store-cart', // Tên key trong localStorage
    }
  )
);