// Script seed dữ liệu demo ARCHI - Interior & Construction cho MySQL dev.
// Chạy: node scripts/seed-dev.mjs  (từ thư mục gốc template)
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const DB_NAME = process.env.MYSQL_DATABASE || 'archi_interior';

const conn = await mysql.createConnection({
  host: process.env.MYSQL_HOST || '162.62.54.247',
  port: parseInt(process.env.MYSQL_PORT || '31760'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'bJ0g168FRq24iuhn3wL7eQyNjU5pG9Ac',
  charset: 'utf8mb4',
  multipleStatements: false,
});

await conn.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
await conn.changeUser({ database: DB_NAME });

// Chuyển cú pháp SQLite trong schema sang MySQL (giống lib/db.js)
function tr(sql) {
  return sql
    .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/gi, 'INT AUTO_INCREMENT PRIMARY KEY')
    .replace(/datetime\('now'\)/gi, 'NOW()')
    .replace(/LONGTEXT NOT NULL/gi, 'LONGTEXT')
    .replace(/INSERT OR IGNORE/gi, 'INSERT IGNORE')
    .replace(/INSERT OR REPLACE/gi, 'REPLACE');
}

const q = async (sql, params = []) => {
  const [rows] = await conn.query(tr(sql), params);
  return rows;
};

// ─── Tables (giống lib/initDb.js) ───────────────────────────────
const tables = [
  `CREATE TABLE IF NOT EXISTS signups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS contact_messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL, phone VARCHAR(100), email VARCHAR(255), subject VARCHAR(255), message TEXT NOT NULL, status VARCHAR(50) NOT NULL DEFAULT 'new', created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')))`,
  `CREATE TABLE IF NOT EXISTS settings (
    \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
    \`value\` TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    display_name TEXT,
    email TEXT,
    phone VARCHAR(100),
    address TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'member',
    tier VARCHAR(50) NOT NULL DEFAULT 'Free',
    active INTEGER NOT NULL DEFAULT 1,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    image TEXT,
    author_id INTEGER,
    author_name TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    layout TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'published',
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS api_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    api_key VARCHAR(255) NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS file_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    url LONGTEXT NOT NULL,
    file_size VARCHAR(50),
    folder VARCHAR(200) DEFAULT 'general',
    uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    uploaded_by INT,
    description TEXT,
    is_public INT DEFAULT 1,
    downloads INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS post_attachments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INT,
    name VARCHAR(500) NOT NULL,
    original_name VARCHAR(500),
    file_type VARCHAR(100),
    file_size BIGINT DEFAULT 0,
    file_size_label VARCHAR(50),
    url LONGTEXT NOT NULL,
    uploaded_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
    uploaded_by INT,
    downloads INT DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS download_tokens (
    token VARCHAR(200) PRIMARY KEY,
    use_count INT DEFAULT 0,
    expires_at BIGINT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS installed_plugins (
    id VARCHAR(191) PRIMARY KEY,
    name TEXT NOT NULL,
    version TEXT,
    config TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    installed_at DATETIME DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS shop_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    parent_id INTEGER,
    icon VARCHAR(100),
    image TEXT,
    description TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    price REAL NOT NULL DEFAULT 0,
    original_price REAL,
    thumbnail TEXT,
    images TEXT,
    brand VARCHAR(255),
    origin VARCHAR(255),
    unit VARCHAR(100) DEFAULT 'Gói',
    stock INTEGER DEFAULT 0,
    sold_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    rating REAL DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    is_featured INTEGER DEFAULT 0,
    is_flash_sale INTEGER DEFAULT 0,
    flash_sale_price REAL,
    flash_sale_end VARCHAR(100),
    tags TEXT,
    meta_title TEXT,
    meta_description TEXT,
    created_at VARCHAR(100) DEFAULT (datetime('now')),
    updated_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    order_id INTEGER,
    reviewer_name VARCHAR(255) NOT NULL,
    reviewer_id INTEGER,
    rating INTEGER NOT NULL DEFAULT 5,
    comment TEXT,
    is_verified INTEGER DEFAULT 0,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_code VARCHAR(100) NOT NULL UNIQUE,
    user_id INTEGER,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255),
    shipping_address TEXT NOT NULL,
    shipping_province VARCHAR(255),
    shipping_note TEXT,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL DEFAULT 0,
    discount_amount REAL DEFAULT 0,
    shipping_fee REAL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    coupon_code VARCHAR(100),
    payment_method VARCHAR(50) DEFAULT 'cod',
    payment_status VARCHAR(50) DEFAULT 'pending',
    status VARCHAR(50) DEFAULT 'pending',
    admin_note TEXT,
    created_at VARCHAR(100) DEFAULT (datetime('now')),
    updated_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code VARCHAR(100) NOT NULL UNIQUE,
    discount_type VARCHAR(50) NOT NULL DEFAULT 'percent',
    discount_value REAL NOT NULL,
    min_order REAL DEFAULT 0,
    max_discount REAL,
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    expires_at VARCHAR(100),
    is_active INTEGER DEFAULT 1,
    created_at VARCHAR(100) DEFAULT (datetime('now'))
  )`,
];

for (const ddl of tables) await q(ddl);
console.log('✅ Tables ready');

// ─── Settings ───────────────────────────────────────────────────
const settings = [
  ['site_title', 'ARCHI - Interior & Construction | Thiết kế & Thi công Nội thất, Xây dựng'],
  ['site_description', 'ARCHI chuyên thiết kế kiến trúc, nội thất và thi công xây dựng trọn gói. Kiến tạo không gian sống hiện đại, tiện nghi và bền vững.'],
  ['site_keywords', 'archi, thiết kế nội thất, thiết kế kiến trúc, xây dựng trọn gói, thi công nội thất, cải tạo nhà'],
  ['header_logo_text', 'ARCHI'],
  ['header_logo_icon', '🏠'],
  ['header_links', JSON.stringify([
    { label: 'Trang chủ', href: '/' },
    { label: 'Giới thiệu', href: '/about' },
    { label: 'Dịch vụ', href: '/products' },
    { label: 'Dự án', href: '/destinations' },
    { label: 'Tin tức', href: '/blog' },
    { label: 'Liên hệ', href: '/contact' },
  ])],
  ['footer_copyright', '© 2024 ARCHI. All rights reserved.'],
  ['social_facebook', ''],
  ['social_zalo', ''],
  ['social_youtube', ''],
  ['social_tiktok', ''],
  ['social_instagram', ''],
  ['social_x', ''],
  ['social_telegram', ''],
  ['social_discord', ''],
  ['social_linkedin', ''],
];
for (const [key, val] of settings) {
  await q('REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
}
console.log('✅ Settings seeded');

// ─── Users ──────────────────────────────────────────────────────
const adminPw = bcrypt.hashSync('admin123', 10);
const modPw = bcrypt.hashSync('mod123', 10);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Administrator', 'admin@noithatxaydung.vn', 'admin', 'Enterprise', 1)", ['admin', adminPw]);
await q("INSERT IGNORE INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, 'Staff Moderator', 'mod@noithatxaydung.vn', 'mod', 'Pro', 1)", ['moderator', modPw]);
console.log('✅ Users seeded (admin/admin123)');

// ─── Trang giới thiệu ───────────────────────────────────────────
const aboutLayout = [
  {
    id: 'b_about_hero', type: 'hero', visible: true,
    configs: {
      title: 'Sứ mệnh ARCHI',
      description: 'Kiến tạo không gian sống hiện đại, tiện nghi và bền vững với giải pháp thiết kế - thi công toàn diện, chi phí minh bạch.',
      buttonText: 'Xem dịch vụ', buttonLink: '/products',
    },
  },
  {
    id: 'b_about_feat', type: 'features', visible: true,
    configs: {
      tag: 'GIÁ TRỊ CỐT LÕI',
      title: 'Cam kết chất lượng cho từng công trình',
      description: 'Hơn 10 năm kiến tạo không gian sống Việt.',
      items: [
        { title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Kiến trúc sư, kỹ sư và đội thợ lành nghề, sáng tạo và tận tâm.' },
        { title: 'Chất Lượng Cam Kết', desc: 'Vật liệu cao cấp, thi công đúng kỹ thuật, bền vững với thời gian.' },
        { title: 'Chi Phí Minh Bạch', desc: 'Báo giá chi tiết, rõ ràng, không phát sinh chi phí ẩn.' },
      ],
    },
  },
];
await q('DELETE FROM pages WHERE slug = ?', ['about']);
await q("INSERT INTO pages (slug, title, description, layout, status) VALUES ('about', 'Giới thiệu về chúng tôi', ?, ?, 'published')",
  ['ARCHI - Đồng hành kiến tạo không gian sống hiện đại, tiện nghi và bền vững.', JSON.stringify(aboutLayout)]);
console.log('✅ About page seeded');

// ─── File categories ────────────────────────────────────────────
for (const c of [
  { name: 'Chưa phân loại', slug: 'general' },
  { name: 'Ảnh công trình', slug: 'images' },
  { name: 'Hồ sơ thiết kế', slug: 'documents' },
  { name: 'Khác', slug: 'other' },
]) {
  await q('INSERT IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
}

// ─── Danh mục dịch vụ ───────────────────────────────────────────
await q('DELETE FROM product_variants');
await q('DELETE FROM products');
await q('DELETE FROM shop_categories');

const cats = [
  { name: 'Thiết kế kiến trúc', slug: 'thiet-ke-kien-truc', icon: '📐', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', sort: 1 },
  { name: 'Thiết kế nội thất', slug: 'thiet-ke-noi-that', icon: '🛋️', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', sort: 2 },
  { name: 'Xây dựng phần thô', slug: 'xay-dung-phan-tho', icon: '🏗️', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80', sort: 3 },
  { name: 'Thi công nội thất', slug: 'thi-cong-noi-that', icon: '🔧', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', sort: 4 },
  { name: 'Cải tạo & sửa chữa', slug: 'cai-tao-sua-chua', icon: '🔨', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80', sort: 5 },
];
const catIds = {};
for (const c of cats) {
  const r = await q('INSERT INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)', [c.name, c.slug, c.icon, c.image, c.sort]);
  catIds[c.slug] = r.insertId;
}
console.log('✅ Service categories seeded');

// ─── Dự án tiêu biểu + Dịch vụ (products) ───────────────────────
const items = [
  // 4 dự án tiêu biểu (featured — hiện ở trang chủ)
  {
    cat: 'thiet-ke-kien-truc', name: 'Biệt thự hiện đại', slug: 'biet-thu-hien-dai',
    short: 'Thiết kế kiến trúc + nội thất trọn gói biệt thự 350m²',
    desc: 'Biệt thự 3 tầng phong cách hiện đại tối giản tại Vinhomes Riverside với không gian mở, tận dụng tối đa ánh sáng tự nhiên. Nội thất gỗ óc chó kết hợp đá marble cao cấp, hệ smarthome điều khiển toàn bộ chiếu sáng và rèm tự động. ARCHI đảm nhận từ concept đến bàn giao chìa khóa trao tay.',
    price: 4500000000, original: null, unit: 'Dự án', origin: 'Vinhomes Riverside, Hà Nội',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 1, rating: 5,
  },
  {
    cat: 'thiet-ke-noi-that', name: 'Căn hộ cao cấp', slug: 'can-ho-cao-cap',
    short: 'Thiết kế + thi công nội thất căn hộ 120m² phong cách Modern Luxury',
    desc: 'Căn hộ 3 phòng ngủ tại Sunshine City phong cách Modern Luxury, tông màu trung tính ấm áp. Toàn bộ nội thất sản xuất tại xưởng ARCHI với gỗ công nghiệp An Cường phủ Melamine, phụ kiện Hafele chính hãng, hoàn thiện trong 45 ngày.',
    price: 850000000, original: null, unit: 'Dự án', origin: 'Sunshine City, Hà Nội',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 1, rating: 5,
  },
  {
    cat: 'xay-dung-phan-tho', name: 'Nhà phố 3 tầng', slug: 'nha-pho-3-tang',
    short: 'Xây dựng trọn gói chìa khóa trao tay nhà phố 240m² sàn',
    desc: 'Nhà phố 3 tầng 1 tum xây mới hoàn toàn trên nền đất 5x16m tại TP. Thủ Đức. ARCHI đảm nhận từ xin phép xây dựng, thi công phần thô đến hoàn thiện nội thất, bàn giao sau 7 tháng đúng cam kết tiến độ.',
    price: 2300000000, original: null, unit: 'Dự án', origin: 'TP. Thủ Đức, TP.HCM',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 1, rating: 5,
  },
  {
    cat: 'thi-cong-noi-that', name: 'Văn phòng hiện đại', slug: 'van-phong-hien-dai',
    short: 'Thiết kế + thi công nội thất văn phòng 450m² phong cách Industrial',
    desc: 'Văn phòng công nghệ 450m² cho 80 nhân sự tại Cầu Giấy theo phong cách Industrial kết hợp Biophilic — trần thô, hệ cây xanh trong nhà, khu pantry và phòng họp kính cách âm hiện đại. Thi công ngoài giờ hành chính, bàn giao sau 40 ngày.',
    price: 1200000000, original: null, unit: 'Dự án', origin: 'Cầu Giấy, Hà Nội',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    featured: 1, flash: 0, sold: 1, rating: 5,
  },
  // 5 gói dịch vụ
  {
    cat: 'thiet-ke-kien-truc', name: 'Thiết kế kiến trúc trọn gói', slug: 'thiet-ke-kien-truc',
    short: 'Hồ sơ thiết kế kiến trúc đầy đủ: concept, 3D, kỹ thuật thi công',
    desc: 'Gói thiết kế kiến trúc trọn gói bao gồm: khảo sát hiện trạng, concept ý tưởng, phối cảnh 3D ngoại thất, hồ sơ kỹ thuật thi công đầy đủ (kiến trúc, kết cấu, điện nước) và dự toán chi tiết. Hỗ trợ xin phép xây dựng và giám sát tác giả trong suốt quá trình thi công.',
    price: 30000000, original: 40000000, unit: 'Bộ hồ sơ', origin: 'Toàn quốc',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    featured: 0, flash: 1, sold: 86, rating: 5,
  },
  {
    cat: 'thiet-ke-noi-that', name: 'Thiết kế nội thất trọn gói', slug: 'thiet-ke-noi-that',
    short: 'Thiết kế nội thất 3D chi tiết từng phòng kèm dự toán vật tư',
    desc: 'Gói thiết kế nội thất trọn gói: concept phong cách theo gu thẩm mỹ của gia chủ, phối cảnh 3D chi tiết từng phòng, hồ sơ kỹ thuật sản xuất đồ nội thất, bảng vật tư và dự toán minh bạch. Miễn phí thiết kế khi ký hợp đồng thi công tại ARCHI.',
    price: 50000000, original: 65000000, unit: 'Gói', origin: 'Toàn quốc',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    featured: 0, flash: 1, sold: 124, rating: 5,
  },
  {
    cat: 'xay-dung-phan-tho', name: 'Xây dựng phần thô', slug: 'xay-dung-phan-tho',
    short: 'Thi công phần thô đúng kỹ thuật, giám sát chặt chẽ (đơn giá/m²)',
    desc: 'Dịch vụ xây dựng phần thô với đơn giá minh bạch theo m² sàn: móng, khung bê tông cốt thép, tường xây, chống thấm, hệ thống điện nước âm. Vật tư chính hãng (thép Hòa Phát, xi măng Hà Tiên...), giám sát kỹ thuật thường trực và nhật ký công trình cập nhật hằng ngày.',
    price: 3500000, original: 4200000, unit: 'm²', origin: 'Toàn quốc',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
    featured: 0, flash: 0, sold: 215, rating: 5,
  },
  {
    cat: 'thi-cong-noi-that', name: 'Thi công nội thất trọn gói', slug: 'thi-cong-noi-that',
    short: 'Sản xuất tại xưởng và thi công nội thất hoàn thiện trọn gói',
    desc: 'Thi công nội thất trọn gói từ xưởng sản xuất riêng của ARCHI: tủ bếp, tủ áo, giường, vách ốp, trần thạch cao, hệ đèn chiếu sáng. Gỗ công nghiệp An Cường, phụ kiện Hafele/Blum chính hãng, bảo hành 2-5 năm tùy hạng mục.',
    price: 250000000, original: 300000000, unit: 'Gói', origin: 'Toàn quốc',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    featured: 0, flash: 0, sold: 98, rating: 5,
  },
  {
    cat: 'cai-tao-sua-chua', name: 'Cải tạo & sửa chữa nhà', slug: 'cai-tao-sua-chua',
    short: 'Cải tạo không gian sống, nâng cấp tiện nghi, chống thấm chống nóng',
    desc: 'Dịch vụ cải tạo nhà cũ, căn hộ xuống cấp: xử lý điện nước, chống thấm chống nóng, sơn sửa toàn bộ, thay mới nội thất, mở rộng - nâng tầng. Khảo sát miễn phí, báo giá chi tiết theo hạng mục, thi công gọn gàng và đúng tiến độ cam kết.',
    price: 100000000, original: 120000000, unit: 'Gói', origin: 'Toàn quốc',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80',
    featured: 0, flash: 0, sold: 67, rating: 5,
  },
];

for (const s of items) {
  const r = await q(
    `INSERT INTO products (category_id, name, slug, short_description, description, price, original_price, thumbnail, brand, origin, unit, stock, sold_count, rating, is_featured, is_flash_sale, flash_sale_price, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'ARCHI', ?, ?, 999, ?, ?, ?, ?, ?, 'active')`,
    [catIds[s.cat], s.name, s.slug, s.short, s.desc, s.price, s.original, s.image, s.origin, s.unit, s.sold, s.rating, s.featured, s.flash, s.flash ? s.price : null]
  );
  await q('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, 999)', [r.insertId, s.unit, s.price]);
}
console.log('✅ Projects & services seeded');

// ─── Bài viết ───────────────────────────────────────────────────
await q('DELETE FROM posts');
const posts = [
  {
    title: 'Xu hướng thiết kế nội thất 2024: Tối giản ấm áp lên ngôi',
    slug: 'xu-huong-thiet-ke-noi-that-2024',
    summary: 'Japandi, Minimalism ấm áp và vật liệu tự nhiên đang dẫn đầu xu hướng thiết kế nội thất năm nay. Cùng ARCHI điểm qua những phong cách được ưa chuộng nhất.',
    content: 'Năm 2024 chứng kiến sự lên ngôi của phong cách tối giản ấm áp (Warm Minimalism): bảng màu trung tính be - nâu - kem, vật liệu gỗ tự nhiên kết hợp đá và vải bố, ánh sáng tầng lớp tạo chiều sâu. Phong cách Japandi - giao thoa giữa Nhật Bản và Bắc Âu - tiếp tục được ưa chuộng nhờ sự thanh lịch và công năng tối ưu. Ngoài ra, xu hướng thiết kế bền vững với vật liệu tái chế, cây xanh trong nhà (Biophilic Design) ngày càng được khách hàng trẻ lựa chọn.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Kinh nghiệm xây nhà trọn gói: 7 điều cần biết trước khi ký hợp đồng',
    slug: 'kinh-nghiem-xay-nha-tron-goi',
    summary: 'Xây nhà là việc trọng đại của mỗi gia đình. Nắm vững 7 kinh nghiệm sau sẽ giúp bạn tránh phát sinh chi phí và chọn được nhà thầu uy tín.',
    content: 'Trước khi ký hợp đồng xây nhà trọn gói, bạn cần: 1) Kiểm tra pháp lý và năng lực của nhà thầu; 2) Yêu cầu báo giá chi tiết theo từng hạng mục, chủng loại vật tư; 3) Thống nhất rõ mốc tiến độ và điều khoản phạt chậm; 4) Làm rõ phạm vi công việc - những gì có và không có trong gói; 5) Quy định rõ chế độ bảo hành từng hạng mục; 6) Giữ lại 5-10% giá trị hợp đồng đến khi nghiệm thu hoàn tất; 7) Yêu cầu nhật ký công trình và giám sát độc lập nếu cần.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cải tạo căn hộ cũ: Biến hóa không gian với ngân sách hợp lý',
    slug: 'cai-tao-can-ho-cu',
    summary: 'Không cần đập bỏ toàn bộ, một kế hoạch cải tạo thông minh có thể biến căn hộ cũ kỹ thành không gian sống hiện đại với chi phí tiết kiệm đáng kể.',
    content: 'Bí quyết cải tạo căn hộ cũ hiệu quả: ưu tiên xử lý hệ thống điện nước và chống thấm trước tiên; sơn lại toàn bộ với tông màu sáng để không gian rộng rãi hơn; thay hệ tủ bếp và tủ quần áo bằng gỗ công nghiệp cao cấp; tận dụng nội thất đa năng cho diện tích nhỏ; bổ sung hệ đèn tầng lớp thay vì chỉ một đèn trần. Với ngân sách 100-200 triệu, ARCHI có thể giúp bạn thay đổi hoàn toàn diện mạo căn hộ 60-80m² trong 30-45 ngày.',
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
  },
];
for (const p of posts) {
  await q("INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, 'Kiến trúc sư ARCHI', 'published')",
    [p.slug, p.title, p.summary, p.content, p.image]);
}
console.log('✅ Posts seeded');

// ─── Coupon ─────────────────────────────────────────────────────
await q('DELETE FROM coupons');
await q("INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES ('ARCHI10', 'percent', 10, 50000000, 20000000, 100, 1)");
console.log('✅ Coupon ARCHI10 seeded');

const prods = await q('SELECT name, price FROM products ORDER BY id');
console.log('\n📋 Items in DB:');
prods.forEach((p) => console.log(`  - ${p.name}: ${Number(p.price).toLocaleString('vi-VN')}đ`));

await conn.end();
console.log('\n🎉 Seed hoàn tất! Database:', DB_NAME);
