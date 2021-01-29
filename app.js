const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//1.載入 mongoose 2.設定 mongoose
const mongoose = require('mongoose') 
mongoose.set('useCreateIndex', true);

//1.載入bodyParser 2.使用bodyParser轉碼
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//告訴expres靜態資源都放在public
app.use(express.static('public'))
//取得已寫好的連線物件
require('./config/db')

// 載入 method-override
const methodOverride = require('method-override') 
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

  //1.載入路由 2.使用路由
const routes = require('./routes/routes')
app.use(routes)

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})