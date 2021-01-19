//把資料庫連線的程式碼複製過來
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
//1.資料庫連線 加入使用新解析器設定
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })
//2.造連線物件(用以查看連線是否異常)
const db = mongoose.connection
//3.檢查連線是否正常
// 連線異常
db.on('error', () => {
    console.log('mongodb 錯誤!')
})

//因為要做的事都與List有關 載進來
const List = require('../list')

//新增種子資料
const restaurant = require('../../restaurant.json')
// for (const key in restaurant.results) {
//     for(const j in restaurant.results[key]){
//         console.log(`${j}: ${restaurant.results[key][j]}`)
//     }}

//找到insertMany 文件上說比for+create還快 
db.once('open', () => {
    console.log('mongodb 連線了')
    const restaurantList = restaurant.results;
    List.insertMany(restaurantList, function (err, docs) {
        if (err) {
            console.log(err);
        }else{
            console.log('儲存成功:', docs)
        }
    });
    console.log('done')
})