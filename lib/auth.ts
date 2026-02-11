import { Role } from "./roles"
import { verifyToken } from "./jwt"

export function authGuard(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 }
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = verifyToken(token) as any

    return {
      user: {
        id: decoded.id,
        role: decoded.role as Role,
      },
    }
  } catch (err) {
    console.error("JWT ERROR:", err)
    return { error: "Invalid or expired token", status: 401 }
  }
}
