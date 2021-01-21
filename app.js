const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//1.載入路由 2.使用路由
const routes = require('./routes/routes')
app.use(routes)

//1.載入 mongoose 2.設定 mongoose
const mongoose = require('mongoose') 
mongoose.set('useCreateIndex', true);

//1.載入bodyParser 2.使用bodyParser轉碼
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

//告訴expres靜態資源都放在public
app.use(express.static('public'))

//1.資料庫連線 設定使用新解析器設定 2.造連線物件(用以查看連線是否異常) 3.檢查連線是否正常
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb 錯誤!')
  })
  // 連線成功
  db.once('open', () => {
    console.log('mongodb 連線了!')
  })

app.listen(port, () => {
    console.log(`已經連線到http://localhost:${port}`)
})