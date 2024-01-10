const express = require("express");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post("/register", (req,res) => {register});
router.post("/login", (req,res)=>{login});

module.exports = router;
