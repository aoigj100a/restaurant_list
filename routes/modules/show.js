const express = require('express')
//載入express路由
const router = express.Router()
// 載入 model
const List = require('../../models/list')


//餐廳資訊
router.get('/:no', (req, res) => {

    List.findOne({ id: req.params.no }).lean()
        .then(lists => res.render('show', { lists }))
        .catch(err => console.log(err))
})

module.exports = router