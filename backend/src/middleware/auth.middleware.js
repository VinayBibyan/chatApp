import jwt from "jsonwebtoken"
import User from "../model/User.js"
import { ENV } from "../lib/env.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if(!token) return res.status(401).json({message: "Unauthorized - No token provided"})

        const decoded = jwt.verify(token, ENV.SECRET)
        if(!decoded) return res.status(401).json({message: "Unauthorized - Invalid token"})

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(401).json({message: "User does not exist"})

        req.user = user
        next()
    } catch (error) {
        console.error("error in protectRoute middleware", error)
        res.status(500).json({message: "Internal server error"})
    }
}