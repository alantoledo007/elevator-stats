require('dotenv').config();
const { Router } = require("express");
const bodyParser = require('body-parser');

const router = Router();
router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))

router.use('/requests', require('./requests.js'));

router.get('/', (req, res) => {
    res.send({message:"Hello world from express!"});
})


module.exports = router;