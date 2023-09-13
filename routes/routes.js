const router = require('express').Router();
const referral = require('../controllers/referral')
router.route('/referral').post([], async (req, res) => {
    let result = await referral.Referral(req, res);
    res.send(JSON.stringify(result))
})
module.exports = router 




