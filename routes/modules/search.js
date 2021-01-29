const express = require('express')
//載入express路由
const router = express.Router()
// 載入 model
const List = require('../../models/list')

//搜尋結果
//排序種類
router.get('/', (req, res) => {
    const keyword = req.query.keyword
    const sorting = req.query.sort
    //1.用 find 取得資料庫資料 2.return回篩選資料 3.去畫面印出
    return List.find({
        //or是只要符合一項就撈出 記得必須加$....
        //regex為規則 用options添加參數
        "$or": [
            { "name": { $regex: `${keyword}`, $options: '$i' } },
            { "name_en": { $regex: `${keyword}`, $options: '$i' } },
            { "category": { $regex: `${keyword}`, $options: '$i' } },
            { "location": { $regex: `${keyword}`, $options: '$i' } }
        ]
    }).lean()
        .sort({ "name_en": [sorting] })
        .then(lists => res.render('index', { lists, keyword: keyword,}))
})

module.exports = router