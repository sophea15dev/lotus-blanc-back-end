import { authUtils } from '../utils/auth';

// Replace this with a database call to your ADMIN table
const mockAdmins = [
    { 
        admin_id: 1, 
        email: "lotusblanc@email.com", 
        password: "$2b$10$NhczuX4bRgRRRvh9Ob/1sOVZbnG010AikmHmcAgjMB90/zD23VItm" // '123123' hashed
    }
];

export const adminService = {
    login: async (email: string, pass: string) => {
        const admin = mockAdmins.find(a => a.email === email);
        if (!admin) return null;

        const isMatch = await authUtils.comparePassword(pass, admin.password);
        if (!isMatch) return null;

        const token = authUtils.generateToken(admin.admin_id);
        return {
            token,
            user: { id: admin.admin_id, email: admin.email }
        };
    }
};