require('./build-public');
const app = require('../server');
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`CNXH · Đời sống: http://localhost:${port}`));
