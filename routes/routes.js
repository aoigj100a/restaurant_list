const express = require('express')

//載入express路由
const router = express.Router()
// 載入 model
const List = require('../models/list')

//載入餐廳資料
const restaurantList = require('../restaurant.json')

//路由設定開始
//首頁
router.get('/', (req, res) => {
    
    List.find().lean()
    .then( lists =>res.render('index', { lists }))
    .catch( err => console.log(err) )
})

//餐廳資訊
router.get('/show/:no', (req, res) => {

    List.findOne({id : req.params.no }).lean()
    .then( lists =>res.render('show', { lists }))
    .catch( err => console.log(err) )

})

//搜尋結果
router.get('/search', (req, res) => {
    //1.去index.handlebars 修改搜尋吧 使網址出現？與值
    //2.取得網址列中 ? 後的內容用於篩選資料
    //3.優化使用者體驗
    const kw = req.query.keyword

    const restaurants = restaurantList.results.filter(odj => {
        const allin = odj.name.concat(odj.category).concat(odj.name_en).concat(odj.location)
        const compar = allin.toLowerCase().includes(kw.toLowerCase())
        return compar
    })
    res.render('index', { restaurants: restaurants, keyword: kw })
})

module.exports = router