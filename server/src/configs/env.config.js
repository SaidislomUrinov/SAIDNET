export default {
    PORT: process.env.PORT || 5000,
    JWT_ACCESS: process.env.JWT_ACCESS || '1234567',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/saidnet',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin',
    ADMIN_NAME: process.env.ADMIN_NAME || 'Admin',
}