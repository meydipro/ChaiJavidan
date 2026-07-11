import bcrypt from 'bcryptjs';

const hash = '$2a$10$QWXlLggbOrexgxBiC8rJKeP7qvrE89xPyV0zBG5TIvenEFduPCU7m';
const result = await bcrypt.compare('admin123', hash);
console.log('Hash valid:', result);

// Also generate a fresh one for comparison
const fresh = await bcrypt.hash('admin123', 10);
console.log('Fresh hash:', fresh);
const result2 = await bcrypt.compare('admin123', fresh);
console.log('Fresh hash valid:', result2);
