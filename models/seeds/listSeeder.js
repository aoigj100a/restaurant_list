const db = require('../../config/db')

//因為要做的事都與List有關 載進來
const List = require('../list')

//新增種子資料
const restaurant = require('../../restaurant.json')

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