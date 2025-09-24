import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        User.findById(decoded?.id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                (req as any).user = user;
                next();
            })
            .catch(() => res.status(500).json({ message: 'Internal server error' }));
    } catch (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
    }
};

export default authMiddleware;