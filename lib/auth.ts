import { Role } from "./roles";
import jwt from "jsonwebtoken";
import { verifyToken } from "./jwt";
type AuthSuccess = {
  user: {
    id: string;
    role: Role;
  };
};

type AuthError = {
  error: string;
  status: number;
};

export function authGuard(req: Request): AuthSuccess | AuthError {
  const token = req.headers.get("authorization");

  if (!token) {
    return { error: "Unauthorized", status: 401 };
  }

  
  const decoded: any = verifyToken(token.replace("Bearer ", ""));

  if (!decoded) {
    return { error: "Invalid token", status: 403 };
  }

  return {
    user: {
      id: decoded.id,
      role: decoded.role as Role, 
    },
  };
} 
