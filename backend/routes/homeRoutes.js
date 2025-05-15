const {Router} = require("express");

const homeRouter = Router();

// signup endpoint
homeRouter.post("/signup", (req, res)=>{
    const {username} = req.body();
})