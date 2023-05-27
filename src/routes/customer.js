import express from "express";


const router = express.Router();
//test router----
router.get('/test', function (req, res) {
    res.send('hello world')
})


//CreateAuthor router  ---------------------------------------------------

// 1. Get all customers List with status ACTIVE [GET]
// 2. Delete customer. [DELETE]
// 3. Create new customer [POST]
router.post('/createcustmomer', );



//login user----
// router.post('/login', login)





export default router;