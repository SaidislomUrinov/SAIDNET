import path from 'path';
import fs from 'fs/promises';
import { getNow } from './time.js';

const allowedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/svg+xml',
    'image/jpg',
    'image/tiff',
    'image/avif'
];

/**
 * Rasmni yuklash
 * @param {Object} image - req.files.image
 * @param {'catalogs' | 'projects'} type - papka nomi (masalan: banners, avatars)
 * @param {String} oId - obyekt ID
 * @returns {String|false} - fayl yo‘li yoki false
 */
export async function uploadImage(image, type, oId) {
    if (!image || !type || !oId) return false;
    if (!allowedImageTypes.includes(image.mimetype)) return false;

    const ext = path.extname(image.name);
    const fileName = `${oId}${getNow()}${ext}`;
    const dir = path.join(process.cwd(), 'uploads', type);
    const fullPath = path.join(dir, fileName);

    try {
        await fs.mkdir(dir, { recursive: true });
        await image.mv(fullPath);
        return `/uploads/${type}/${fileName}`;
    } catch (err) {
        console.error('Upload error:', err);
        return false;
    }
}

/**
 * Faylni o‘chirish
 * @param {String} filePath - to‘liq yo‘l yoki relative (`/uploads/type/filename.jpg`)
 * @returns {Boolean} - o‘chirildi yoki yo‘q
 */
export async function removeImage(filePath) {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        await fs.unlink(fullPath);
        return true;
    } catch (err) {
        console.error('Remove error:', err);
        return false;
    }
}
