import { query } from './db';
import { hashPassword } from './auth';

export async function initDatabase() {
  // Signups table
  await query(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Contact messages table (tin nhắn từ trang Liên hệ)
  await query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(100),
      email VARCHAR(255),
      subject VARCHAR(255),
      message TEXT NOT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Settings table
  await query(`
    CREATE TABLE IF NOT EXISTS settings (
      \`key\` VARCHAR(255) NOT NULL PRIMARY KEY,
      \`value\` TEXT
    )
  `);

  // Users table
  await query(`
    CREATE TABLE IF NOT EXISTS users (
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
    )
  `);

  try {
    await query('ALTER TABLE users ADD COLUMN phone VARCHAR(100)');
  } catch (err) {}

  try {
    await query('ALTER TABLE users ADD COLUMN address TEXT');
  } catch (err) {}

  try {
    await query("ALTER TABLE users ADD COLUMN tier VARCHAR(50) NOT NULL DEFAULT 'Free'");
  } catch (err) {}

  // Alter products table columns if missing
  const productsColumns = [
    { name: 'original_price', type: 'REAL' },
    { name: 'images', type: 'TEXT' },
    { name: 'brand', type: 'VARCHAR(255)' },
    { name: 'origin', type: 'VARCHAR(255)' },
    { name: 'unit', type: "VARCHAR(100) DEFAULT 'Hộp'" },
    { name: 'sold_count', type: 'INTEGER DEFAULT 0' },
    { name: 'view_count', type: 'INTEGER DEFAULT 0' },
    { name: 'rating', type: 'REAL DEFAULT 0' },
    { name: 'is_featured', type: 'INTEGER DEFAULT 0' },
    { name: 'is_flash_sale', type: 'INTEGER DEFAULT 0' },
    { name: 'flash_sale_price', type: 'REAL' },
    { name: 'flash_sale_end', type: 'VARCHAR(100)' },
    { name: 'tags', type: 'TEXT' },
    { name: 'meta_title', type: 'TEXT' },
    { name: 'meta_description', type: 'TEXT' }
  ];

  for (const col of productsColumns) {
    try {
      await query(`ALTER TABLE products ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      // Column might already exist
    }
  }

  // Posts/Changelog table
  await query(`
    CREATE TABLE IF NOT EXISTS posts (
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
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Pages table
  await query(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug VARCHAR(255) NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      layout TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'published',
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now')),
      updated_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // API Keys table
  await query(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_key VARCHAR(255) NOT NULL UNIQUE,
      user_id INTEGER NOT NULL,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // File Categories table
  await query(`
    CREATE TABLE IF NOT EXISTS file_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      created_at VARCHAR(100) NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Files table
  await query(`
    CREATE TABLE IF NOT EXISTS files (
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
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Post Attachments table
  await query(`
    CREATE TABLE IF NOT EXISTS post_attachments (
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
      downloads INT DEFAULT 0,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Download tokens tracking table
  await query(`
    CREATE TABLE IF NOT EXISTS download_tokens (
      token VARCHAR(200) PRIMARY KEY,
      use_count INT DEFAULT 0,
      expires_at BIGINT NOT NULL
    )
  `);

  // Installed Plugins table — lưu plugin đã cài và config trong DB của website
  await query(`
    CREATE TABLE IF NOT EXISTS installed_plugins (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      version TEXT DEFAULT '1.0.0',
      config TEXT DEFAULT '{}',
      active INTEGER NOT NULL DEFAULT 1,
      installed_at DATETIME DEFAULT (datetime('now'))
    )
  `);


  // ─── E-COMMERCE TABLES ───────────────────────────────────────

  // Shop Categories (danh mục sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS shop_categories (
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
    )
  `);

  // Products (sản phẩm)
  await query(`
    CREATE TABLE IF NOT EXISTS products (
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
      unit VARCHAR(100) DEFAULT 'Hộp',
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
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES shop_categories(id) ON DELETE SET NULL
    )
  `);

  // Product Variants (biến thể sản phẩm: Hộp, Vỉ, Chai...)
  await query(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      name VARCHAR(255) NOT NULL,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Product Reviews (đánh giá)
  await query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      order_id INTEGER,
      reviewer_name VARCHAR(255) NOT NULL,
      reviewer_id INTEGER,
      rating INTEGER NOT NULL DEFAULT 5,
      comment TEXT,
      is_verified INTEGER DEFAULT 0,
      created_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    )
  `);

  // Orders (đơn hàng)
  await query(`
    CREATE TABLE IF NOT EXISTS orders (
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
      updated_at VARCHAR(100) DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `);

  // Coupons (mã giảm giá)
  await query(`
    CREATE TABLE IF NOT EXISTS coupons (
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
    )
  `);

  // Alter tables to add SEO columns dynamically if they do not exist
  const addColumns = [
    { table: 'pages', column: 'meta_title', type: 'TEXT' },
    { table: 'pages', column: 'meta_description', type: 'TEXT' },
    { table: 'pages', column: 'meta_keywords', type: 'TEXT' },
    { table: 'posts', column: 'meta_title', type: 'TEXT' },
    { table: 'posts', column: 'meta_description', type: 'TEXT' },
    { table: 'posts', column: 'meta_keywords', type: 'TEXT' }
  ];

  for (const item of addColumns) {
    try {
      await query(`ALTER TABLE ${item.table} ADD COLUMN ${item.column} ${item.type}`);
      console.log(`Added column ${item.column} to table ${item.table}`);
    } catch (err) {
      // Column already exists or error
    }
  }

  console.log('✅ Database tables created and migrated');
}


export async function seedData(adminPassword, force = false) {
  const passwordToSeed = adminPassword || 'admin123';
  
  // Check if we should force override because the database was previously seeded with data of another template
  let isOtherTemplate = false;
  try {
    const existingLogo = await query('SELECT `value` FROM settings WHERE `key` = ?', ['header_logo_text']);
    const oldLogos = ['Command Code', 'FPT Long Châu', 'Sâm Ngọc Linh', 'Nha Khoa Smile'];
    if (existingLogo.length > 0 && oldLogos.includes(existingLogo[0].value)) {
      isOtherTemplate = true;
    }
  } catch (e) {
    // Table or settings might not exist yet
  }

  const shouldForce = force || isOtherTemplate;

  // Seed Settings
  const defaultSettings = [
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
      { label: 'Liên hệ', href: '/contact' }
    ])],
    ['footer_copyright', '© 2024 ARCHI. All rights reserved.'],
    // Liên hệ mạng xã hội (để trống = ẩn icon tương ứng)
    ['social_facebook', ''],
    ['social_zalo', ''],
    ['social_youtube', ''],
    ['social_tiktok', ''],
    ['social_instagram', ''],
    ['social_x', ''],
    ['social_telegram', ''],
    ['social_discord', ''],
    ['social_linkedin', ''],
    ['footer_columns', JSON.stringify([
      {
        title: 'Về chúng tôi',
        links: [
          { label: 'Giới thiệu', href: '/about' },
          { label: 'Đội ngũ bác sĩ', href: '/about' },
          { label: 'Chính sách bảo hành', href: '#' }
        ]
      },
      {
        title: 'Hỗ trợ khách hàng',
        links: [
          { label: 'Câu hỏi thường gặp', href: '/blog' },
          { label: 'Hướng dẫn thanh toán', href: '#' },
          { label: 'Chính sách bảo mật', href: '#' }
        ]
      }
    ])]
  ];

  for (const [key, val] of defaultSettings) {
    try {
      if (shouldForce) {
        await query('INSERT OR REPLACE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      } else {
        await query('INSERT OR IGNORE INTO settings (`key`, `value`) VALUES (?, ?)', [key, val]);
      }
    } catch (err) {
      console.error(`Failed to seed setting key ${key}:`, err);
    }
  }

  // Seed default admin and moderator users
  try {
    const adminExists = await query('SELECT id FROM users WHERE username = ?', ['admin']);
    const hashedAdminPw = await hashPassword(passwordToSeed);
    if (adminExists.length === 0) {
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['admin', hashedAdminPw, 'Administrator', 'admin@noithatxaydung.vn', 'admin', 'Enterprise']
      );
      console.log('👑 Default admin user seeded');
    } else if (adminPassword) {
      await query('UPDATE users SET password = ? WHERE username = ?', [hashedAdminPw, 'admin']);
      console.log('👑 Admin user password updated to custom password');
    }

    const modExists = await query('SELECT id FROM users WHERE username = ?', ['moderator']);
    if (modExists.length === 0) {
      const hashedModPw = await hashPassword('mod123');
      await query(
        'INSERT INTO users (username, password, display_name, email, role, tier, active) VALUES (?, ?, ?, ?, ?, ?, 1)',
        ['moderator', hashedModPw, 'Staff Moderator', 'mod@noithatxaydung.vn', 'mod', 'Pro']
      );
      console.log('🛡️ Default moderator user seeded');
    }
  } catch (err) {
    console.error('Failed to seed default users:', err);
  }

  // Seed default dynamic pages
  try {
    const pageExists = await query('SELECT id FROM pages WHERE slug = ?', ['about']);
    if (pageExists.length === 0 || shouldForce) {
      const defaultLayout = [
        {
          id: 'b_about_hero',
          type: 'hero',
          visible: true,
          configs: {
            title: 'Sứ mệnh ARCHI',
            description: 'Kiến tạo không gian sống hiện đại, tiện nghi và bền vững với giải pháp thiết kế - thi công toàn diện, chi phí minh bạch.',
            buttonText: 'Xem dịch vụ',
            buttonLink: '/products'
          }
        },
        {
          id: 'b_about_feat',
          type: 'features',
          visible: true,
          configs: {
            tag: 'GIÁ TRỊ CỐT LÕI',
            title: 'Cam kết chất lượng cho từng công trình',
            description: 'Hơn 10 năm kiến tạo không gian sống Việt.',
            items: [
              { title: 'Đội Ngũ Chuyên Nghiệp', desc: 'Kiến trúc sư, kỹ sư và đội thợ lành nghề, sáng tạo và tận tâm.' },
              { title: 'Chất Lượng Cam Kết', desc: 'Vật liệu cao cấp, thi công đúng kỹ thuật, bền vững với thời gian.' },
              { title: 'Chi Phí Minh Bạch', desc: 'Báo giá chi tiết, rõ ràng, không phát sinh chi phí ẩn.' }
            ]
          }
        }
      ];
      if (pageExists.length > 0) {
        await query('DELETE FROM pages WHERE slug = ?', ['about']);
      }
      await query(
        'INSERT INTO pages (slug, title, description, layout, status) VALUES (?, ?, ?, ?, ?)',
        ['about', 'Giới thiệu về chúng tôi', 'ARCHI - Đồng hành kiến tạo không gian sống hiện đại, tiện nghi và bền vững.', JSON.stringify(defaultLayout), 'published']
      );
      console.log('📄 Default about page seeded');
    }
  } catch (err) {
    console.error('Failed to seed default pages:', err);
  }

  // Seed default file categories
  try {
    const existingFileCats = await query('SELECT COUNT(*) as cnt FROM file_categories');
    if (existingFileCats[0].cnt === 0) {
      const defaultFileCats = [
        { name: 'Chưa phân loại', slug: 'general' },
        { name: 'Ảnh minh họa', slug: 'images' },
        { name: 'Tài liệu hướng dẫn', slug: 'documents' },
        { name: 'Mã nguồn / Code', slug: 'code' },
        { name: 'Khác', slug: 'other' }
      ];
      for (const c of defaultFileCats) {
        await query('INSERT OR IGNORE INTO file_categories (name, slug) VALUES (?, ?)', [c.name, c.slug]);
      }
      console.log('📁 Default file categories seeded');
    }
  } catch (err) {
    console.error('Failed to seed default file categories:', err);
  }

  // Seed E-Commerce data (shop categories + sample products + coupon)
  try {
    const catCount = await query('SELECT COUNT(*) as cnt FROM shop_categories');
    if (catCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM shop_categories');
      }
      const defaultCats = [
        { name: 'Thiết kế kiến trúc', slug: 'thiet-ke-kien-truc', icon: '📐', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80', sort_order: 1 },
        { name: 'Thiết kế nội thất', slug: 'thiet-ke-noi-that', icon: '🛋️', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', sort_order: 2 },
        { name: 'Xây dựng phần thô', slug: 'xay-dung-phan-tho', icon: '🏗️', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80', sort_order: 3 },
        { name: 'Thi công nội thất', slug: 'thi-cong-noi-that', icon: '🔧', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80', sort_order: 4 },
        { name: 'Cải tạo & sửa chữa', slug: 'cai-tao-sua-chua', icon: '🔨', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80', sort_order: 5 },
      ];
      for (const c of defaultCats) {
        await query(
          'INSERT OR IGNORE INTO shop_categories (name, slug, icon, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [c.name, c.slug, c.icon, c.image, c.sort_order]
        );
      }
      console.log('🛍️ Default shop categories seeded');
    }

    const prodCount = await query('SELECT COUNT(*) as cnt FROM products');
    if (prodCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM products');
        await query('DELETE FROM product_variants');
      }
      const catKienTruc = await query("SELECT id FROM shop_categories WHERE slug = 'thiet-ke-kien-truc'");
      const catNoiThat = await query("SELECT id FROM shop_categories WHERE slug = 'thiet-ke-noi-that'");
      const catPhanTho = await query("SELECT id FROM shop_categories WHERE slug = 'xay-dung-phan-tho'");
      const catThiCong = await query("SELECT id FROM shop_categories WHERE slug = 'thi-cong-noi-that'");
      const catCaiTao = await query("SELECT id FROM shop_categories WHERE slug = 'cai-tao-sua-chua'");

      const catIdKienTruc = catKienTruc[0]?.id || null;
      const catIdNoiThat = catNoiThat[0]?.id || null;
      const catIdPhanTho = catPhanTho[0]?.id || null;
      const catIdThiCong = catThiCong[0]?.id || null;
      const catIdCaiTao = catCaiTao[0]?.id || null;

      const sampleProducts = [
        { category_id: catIdKienTruc, name: 'Biệt thự hiện đại', slug: 'biet-thu-hien-dai', short_description: 'Thiết kế kiến trúc + nội thất trọn gói biệt thự 350m²', price: 4500000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Vinhomes Riverside, Hà Nội', unit: 'Dự án', stock: 10, is_featured: 1 },
        { category_id: catIdNoiThat, name: 'Căn hộ cao cấp', slug: 'can-ho-cao-cap', short_description: 'Thiết kế + thi công nội thất căn hộ 120m² phong cách Modern Luxury', price: 850000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Sunshine City, Hà Nội', unit: 'Dự án', stock: 10, is_featured: 1 },
        { category_id: catIdPhanTho, name: 'Nhà phố 3 tầng', slug: 'nha-pho-3-tang', short_description: 'Xây dựng trọn gói chìa khóa trao tay nhà phố 240m² sàn', price: 2300000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'TP. Thủ Đức, TP.HCM', unit: 'Dự án', stock: 10, is_featured: 1 },
        { category_id: catIdThiCong, name: 'Văn phòng hiện đại', slug: 'van-phong-hien-dai', short_description: 'Thiết kế + thi công nội thất văn phòng 450m² phong cách Industrial', price: 1200000000, original_price: null, thumbnail: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Cầu Giấy, Hà Nội', unit: 'Dự án', stock: 10, is_featured: 1 },
        { category_id: catIdKienTruc, name: 'Thiết kế kiến trúc trọn gói', slug: 'thiet-ke-kien-truc', short_description: 'Hồ sơ thiết kế kiến trúc đầy đủ: concept, 3D, kỹ thuật thi công', price: 30000000, original_price: 40000000, thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Toàn quốc', unit: 'Bộ hồ sơ', stock: 100, is_flash_sale: 1, flash_sale_price: 30000000 },
        { category_id: catIdNoiThat, name: 'Thiết kế nội thất trọn gói', slug: 'thiet-ke-noi-that', short_description: 'Thiết kế nội thất 3D chi tiết từng phòng kèm dự toán vật tư', price: 50000000, original_price: 65000000, thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Toàn quốc', unit: 'Gói', stock: 100, is_flash_sale: 1, flash_sale_price: 50000000 },
        { category_id: catIdPhanTho, name: 'Xây dựng phần thô', slug: 'xay-dung-phan-tho', short_description: 'Thi công phần thô đúng kỹ thuật, giám sát chặt chẽ (đơn giá/m²)', price: 3500000, original_price: 4200000, thumbnail: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Toàn quốc', unit: 'm²', stock: 999 },
        { category_id: catIdThiCong, name: 'Thi công nội thất trọn gói', slug: 'thi-cong-noi-that', short_description: 'Sản xuất tại xưởng và thi công nội thất hoàn thiện trọn gói', price: 250000000, original_price: 300000000, thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Toàn quốc', unit: 'Gói', stock: 100 },
        { category_id: catIdCaiTao, name: 'Cải tạo & sửa chữa nhà', slug: 'cai-tao-sua-chua', short_description: 'Cải tạo không gian sống, nâng cấp tiện nghi, chống thấm chống nóng', price: 100000000, original_price: 120000000, thumbnail: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=800&q=80', brand: 'ARCHI', origin: 'Toàn quốc', unit: 'Gói', stock: 100 }
      ];

      for (const p of sampleProducts) {
        try {
          await query(
            `INSERT OR IGNORE INTO products (category_id, name, slug, short_description, price, original_price, thumbnail, brand, origin, unit, stock, is_featured, is_flash_sale, flash_sale_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
            [p.category_id, p.name, p.slug, p.short_description, p.price, p.original_price || null, p.thumbnail || null, p.brand || null, p.origin || null, p.unit || 'Gói', p.stock || 0, p.is_featured || 0, p.is_flash_sale || 0, p.flash_sale_price || null]
          );
          // Add variants for each product
          const prod = await query('SELECT id FROM products WHERE slug = ?', [p.slug]);
          if (prod.length > 0) {
            const pid = prod[0].id;
            await query('INSERT INTO product_variants (product_id, name, price, stock) VALUES (?, ?, ?, ?)', [pid, p.unit || 'Gói', p.price, p.stock]);
          }
        } catch (e) { /* ignore duplicate */ }
      }
      console.log('🛒 Sample products seeded');
    }

    // Seed default blog posts
    const postCount = await query('SELECT COUNT(*) as cnt FROM posts');
    if (postCount[0].cnt === 0 || shouldForce) {
      if (shouldForce) {
        await query('DELETE FROM posts');
      }
      
      const defaultPosts = [
        {
          title: 'Xu hướng thiết kế nội thất 2024: Tối giản ấm áp lên ngôi',
          slug: 'xu-huong-thiet-ke-noi-that-2024',
          summary: 'Japandi, Minimalism ấm áp và vật liệu tự nhiên đang dẫn đầu xu hướng thiết kế nội thất năm nay. Cùng ARCHI điểm qua những phong cách được ưa chuộng nhất.',
          content: 'Năm 2024 chứng kiến sự lên ngôi của phong cách tối giản ấm áp (Warm Minimalism): bảng màu trung tính be - nâu - kem, vật liệu gỗ tự nhiên kết hợp đá và vải bố, ánh sáng tầng lớp tạo chiều sâu. Phong cách Japandi - giao thoa giữa Nhật Bản và Bắc Âu - tiếp tục được ưa chuộng nhờ sự thanh lịch và công năng tối ưu. Ngoài ra, xu hướng thiết kế bền vững với vật liệu tái chế, cây xanh trong nhà (Biophilic Design) ngày càng được khách hàng trẻ lựa chọn.',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          author_name: 'Kiến trúc sư ARCHI'
        },
        {
          title: 'Kinh nghiệm xây nhà trọn gói: 7 điều cần biết trước khi ký hợp đồng',
          slug: 'kinh-nghiem-xay-nha-tron-goi',
          summary: 'Xây nhà là việc trọng đại của mỗi gia đình. Nắm vững 7 kinh nghiệm sau sẽ giúp bạn tránh phát sinh chi phí và chọn được nhà thầu uy tín.',
          content: 'Trước khi ký hợp đồng xây nhà trọn gói, bạn cần: 1) Kiểm tra pháp lý và năng lực của nhà thầu; 2) Yêu cầu báo giá chi tiết theo từng hạng mục, chủng loại vật tư; 3) Thống nhất rõ mốc tiến độ và điều khoản phạt chậm; 4) Làm rõ phạm vi công việc - những gì có và không có trong gói; 5) Quy định rõ chế độ bảo hành từng hạng mục; 6) Giữ lại 5-10% giá trị hợp đồng đến khi nghiệm thu hoàn tất; 7) Yêu cầu nhật ký công trình và giám sát độc lập nếu cần.',
          image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80',
          author_name: 'Kiến trúc sư ARCHI'
        },
        {
          title: 'Cải tạo căn hộ cũ: Biến hóa không gian với ngân sách hợp lý',
          slug: 'cai-tao-can-ho-cu',
          summary: 'Không cần đập bỏ toàn bộ, một kế hoạch cải tạo thông minh có thể biến căn hộ cũ kỹ thành không gian sống hiện đại với chi phí tiết kiệm đáng kể.',
          content: 'Bí quyết cải tạo căn hộ cũ hiệu quả: ưu tiên xử lý hệ thống điện nước và chống thấm trước tiên; sơn lại toàn bộ với tông màu sáng để không gian rộng rãi hơn; thay hệ tủ bếp và tủ quần áo bằng gỗ công nghiệp cao cấp; tận dụng nội thất đa năng cho diện tích nhỏ; bổ sung hệ đèn tầng lớp thay vì chỉ một đèn trần. Với ngân sách 100-200 triệu, ARCHI có thể giúp bạn thay đổi hoàn toàn diện mạo căn hộ 60-80m² trong 30-45 ngày.',
          image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
          author_name: 'Kiến trúc sư ARCHI'
        }
      ];

      for (const p of defaultPosts) {
        await query(
          `INSERT INTO posts (slug, title, summary, content, image, author_name, status) VALUES (?, ?, ?, ?, ?, ?, 'published')`,
          [p.slug, p.title, p.summary, p.content, p.image, p.author_name]
        );
      }
      console.log('📝 Sample posts seeded');
    }

    // Seed a sample coupon
    const couponExists = await query("SELECT id FROM coupons WHERE code = 'ARCHI10'");
    if (couponExists.length === 0) {
      await query(
        "INSERT INTO coupons (code, discount_type, discount_value, min_order, max_discount, usage_limit, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
        ['ARCHI10', 'percent', 10, 50000000, 20000000, 100]
      );
      console.log('🎟️ Sample coupon SMILE30 seeded');
    }

  } catch (err) {
    console.error('Failed to seed E-Commerce data:', err);
  }

  console.log('✅ Seed data complete');
}
