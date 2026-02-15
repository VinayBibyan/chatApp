import jwt from "jsonwebtoken"
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, ENV.SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //milisecond
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", //CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false : true,
    })

    return token;
}