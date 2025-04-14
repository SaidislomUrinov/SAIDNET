import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPass(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

export async function comparePass(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}
