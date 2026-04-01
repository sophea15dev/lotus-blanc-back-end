import { authUtils } from '../utils/auth';

// Replace this with a database call to your ADMIN table
const mockAdmins = [
    { 
        admin_id: 1, 
        email: "admin@lotus.com", 
        password: "$2b$10$76/yB8L.X8R9D5p6k7j8u.eF1G2H3I4J5K6L7M8N9O0P1Q2R3S4T5" // 'password123' hashed
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