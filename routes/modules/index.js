const express = require('express')
//載入express路由
const router = express.Router()
// 載入 model
const List = require('../../models/list')

//首頁
router.get('/', (req, res) => {

    List.find().lean()
        .then(lists =>
            res.render('index', { lists })
        )
        .catch(err => console.log(err))
})

module.exports = router