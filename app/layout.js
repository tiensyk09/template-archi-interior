import './globals.css';
import { CartProvider } from '@/components/CartContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import PluginRunner from '@/components/PluginRunner';
import TopLoader from '@/components/TopLoader';

export const metadata = {
  title: 'ARCHI - Interior & Construction | Thiết kế & Thi công Nội thất, Xây dựng',
  description: 'ARCHI chuyên thiết kế kiến trúc, nội thất và thi công xây dựng trọn gói. Kiến tạo không gian sống hiện đại, tiện nghi và bền vững. Giải pháp toàn diện - Chất lượng bền vững - Thẩm mỹ vượt thời gian.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="bg-white text-gray-800 font-sans antialiased min-h-screen">
        <TopLoader color="#b08d57" />
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <PluginRunner />
        </CartProvider>
      </body>
    </html>
  );
}
