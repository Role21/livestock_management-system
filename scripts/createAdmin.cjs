const bcrypt = require('bcryptjs');
const db = require('../server/utils/db.cjs'); // Keep as .cjs for compatibility

(async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10); // 🔐 Change before production
  const [existing] = await db.query('SELECT * FROM users WHERE email = ?', ['admin@example.com']);

  if (existing.length === 0) {
    await db.query(`
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)`,
      ['Admin', 'admin@example.com', hashedPassword, 'admin']
    );
    console.log('✅ Default admin created.');
  } else {
    console.log('ℹ️ Admin already exists.');
  }

  process.exit();
})();
