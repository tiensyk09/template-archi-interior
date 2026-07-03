import OrdersPageClient from '@/components/OrdersPageClient';

export const metadata = {
  title: 'Tài khoản & Lịch sử đơn hàng | ARCHI',
  description: 'Tra cứu đơn hàng, xem chi tiết lịch sử dịch vụ và cập nhật thông tin liên hệ tại ARCHI.'
};

export default function OrdersPage() {
  return <OrdersPageClient />;
}
