import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'seuSegredoForte';

export function gerarToken(payload: object): string {
    return jwt.sign(payload, SECRET, {
        expiresIn: '1h',
    });
}
