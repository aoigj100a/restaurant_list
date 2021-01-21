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
    const kw = req.query.keyword
    //1.用 find 取得資料庫資料 2.return回篩選資料 3.去畫面印出
    return List.find({
        //or是只要符合一項就撈出 記得必須加$....
        //regex為規則 用options添加參數
        "$or":[
            { "name": { $regex: `${kw}`, $options: '$i' } },
            { "name_en": { $regex: `${kw}`, $options: '$i' } },
            { "category": { $regex: `${kw}`, $options: '$i' } },
            { "location": { $regex: `${kw}`, $options: '$i' } }
          ]
    }).lean()
    .then( lists => res.render('index', { lists, keyword: kw }))
})

//CRUD
router.get('/edit',(req, res)=>{
    res.render('edit')
})

router.get('/new',(req, res)=>{
    res.render('new')
})

router.get('/delete',(req, res)=>{
    res.render('delete')
})



module.exports = router