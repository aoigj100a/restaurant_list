const express = require('express')
//載入express路由
const router = express.Router()
// 載入 model
const List = require('../models/list')


//路由設定開始
//首頁
router.get('/', (req, res) => {

    List.find().lean()
        .then(lists => res.render('index', { lists }))
        .catch(err => console.log(err))
})

//餐廳資訊
router.get('/show/:no', (req, res) => {

    List.findOne({ id: req.params.no }).lean()
        .then(lists => res.render('show', { lists }))
        .catch(err => console.log(err))

})

//搜尋結果
router.get('/search', (req, res) => {
    const kw = req.query.keyword
    //1.用 find 取得資料庫資料 2.return回篩選資料 3.去畫面印出
    return List.find({
        //or是只要符合一項就撈出 記得必須加$....
        //regex為規則 用options添加參數
        "$or": [
            { "name": { $regex: `${kw}`, $options: '$i' } },
            { "name_en": { $regex: `${kw}`, $options: '$i' } },
            { "category": { $regex: `${kw}`, $options: '$i' } },
            { "location": { $regex: `${kw}`, $options: '$i' } }
        ]
    }).lean()
        .then(lists => res.render('index', { lists, keyword: kw }))
})

//CRUD
//路線 /action/new 顯示新增的畫面 目前沒有做別的事
router.get('/action/new', (req, res) => {
    res.render('new')
})
// 路線 /action 1.做新增 2.導回首頁
router.post('/action', async function (req, res) {
    // console.log(req.body)
    //取得總文件數量
    //原本 ||  MyModel.findOne({}).then()
    //如果你使用await || await MyModel.findOne({}).exec() 
    const count = await List.countDocuments({}).exec();
    const id = count + 1

    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return List.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//路線edit
router.get('/action/:no/edit', (req, res) => {
    
    List.findOne({ id: req.params.no }).lean()
        .then(lists => res.render('edit', { lists }))
        .catch(err => console.log(err))

})
router.post('/action/:no/edit', (req, res) => {
    // console.log(req.params.no)
    const id = req.params.no
    const {  name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return List.findOne({ id: req.params.no })
    //使用 for in 閱覽 lists 的 key屬性名
        .then(lists => {
            for(const key in lists){
                lists.key = key
            }
            return lists.save()
        }).then(()=> res.redirect(`/show/${id}`))
        .catch(error => console.log(error))
})


router.get('/action/:no/delete', (req, res) => {
    List.findOne({ id: req.params.no }).lean()
    .then(lists => res.render('delete', { lists }))
    .catch(err => console.log(err))

})

router.post('/action/:no/delete/y',(req,res)=>{
    // res.send('delete')
    const id = req.params.no
    List.findOne({ id: id })
    .then(lists => lists.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



module.exports = router