const bcrypt = require('bcryptjs');

async function test() {
  const password = 'secret123';
  const hash = await bcrypt.hash(password, 10);
  const isMatch = await bcrypt.compare('secret123', hash);
  console.log({ hash, isMatch });
}

test();
