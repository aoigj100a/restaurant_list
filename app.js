const express = require('express')
const app = express()
const port = 3000

// 1.載入 mongoose
const mongoose = require('mongoose') 

//1.載入bodyParser 2.使用bodyParser轉碼
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//1.載入樣板引擎 2.啟動引擎 3.設定引擎
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//告訴expres靜態資源都放在public
app.use(express.static('public'))

//載入餐廳資料
const restaurantList = require('./restaurant.json')

//路由設定開始
//首頁
app.get('/', (req, res) => {
    //1.放上靜態網站 2.去抓json 
    //3.去index.handlebars使用樣版引擎把資料用迴圈印出來(忘記forEach與this...)

    // res.send('測試餐廳搜尋網頁首頁')
    res.render('index', { restaurants: restaurantList.results })
})

//餐廳資訊
app.get('/show/:no', (req, res) => {
    //1.放上靜態網站 並使用params（動態路由）使得/show/後面放任意字都不出現錯誤
    //2.去抓json 使用篩選器篩選出要顯示的資料(function記得要傳回值！！！)
    //3.去show.handlebars 印出資料

    const restaurants = restaurantList.results.find(function (odj) {
        return odj.id.toString() === req.params.no
    })
    res.render('show', { restaurants: restaurants })

})

//搜尋結果
app.get('/search', (req, res) => {
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

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})