import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // File CSS của Tailwind
import { Toaster } from "react-hot-toast"; // Component để hiển thị thông báo
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothing Store",
  description: "E-commerce site for clothing",
};

// --- Component Header (Thanh điều hướng) ---
function Header() {
  // (Chúng ta sẽ thêm state giỏ hàng vào đây sau)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <nav className="container mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyStore
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
            Sản phẩm
          </Link>
          <Link href="/cart" className="relative rounded-full p-2 text-gray-700 hover:bg-gray-100">
            {/* Icon giỏ hàng */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z"
              />
            </svg>
            {/* (Chúng ta sẽ thêm số lượng item ở đây) */}
            {/* <span className="absolute right-0 top-0 ...">3</span> */}
          </Link>
        </div>
      </nav>
    </header>
  );
}

// --- Layout chính bao bọc toàn bộ App ---
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Provider cho react-hot-toast */}
        <Toaster position="bottom-center" />
        
        <Header />
        
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* (Footer có thể thêm vào đây) */}
        <footer className="border-t py-8 text-center text-sm text-gray-500">
          © 2025 Clothing Store.
        </footer>
      </body>
    </html>
  );
}