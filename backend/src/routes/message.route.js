import express from "express"

const router = express.Router()

router.get("/send", (req, res) =>{
    res.send("send message endpoint")
})

router.get("/recive", (req, res) =>{
    res.send("recive message endpoint")
})

export default router