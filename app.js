const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//載入 mongoose
const mongoose = require('mongoose') 
mongoose.set('useCreateIndex', true);

//1.載入bodyParser 2.使用bodyParser轉碼
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))


//告訴expres靜態資源都放在public
app.use(express.static('public'))

//載入餐廳資料
const restaurantList = require('./restaurant.json')

// 載入 model
const List = require('./models/list') 

//1.資料庫連線 加入使用新解析器設定
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
//2.造連線物件(用以查看連線是否異常)
const db = mongoose.connection
//3.檢查連線是否正常
// 連線異常
db.on('error', () => {
    console.log('mongodb 錯誤!')
  })
  // 連線成功
  db.once('open', () => {
    console.log('mongodb 連線了!')
  })

//路由設定開始
//首頁
app.get('/', (req, res) => {
    List.find().lean()
    .then( lists =>res.render('index', { lists }))
    .catch( err => console.log(err) )
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