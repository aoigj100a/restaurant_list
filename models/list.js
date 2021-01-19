//負責和資料庫互動
//1.因為需要使用mongoose的方法 所以載入進來
const mongoose = require('mongoose')
//2.使用mongoose提供的Schema模組 造出物件
const Schema = mongoose.Schema
const listSchema = new Schema({
    //3.設定Schema
    id: {
      type: Number, 
      required: true ,
      unique: true 
    },
    name: {
      type: String, 
      required: true 
    },
    name_en: {
      type: String, 
      required: true 
    },
    category: {
      type: String, 
      required: true 
    },
    image: {
      type: String, 
      required: true 
    },
    location: {
      type: String, 
      required: true 
    },
    phone: {
      type: String, 
      required: true 
    },
    google_map: {
      type: String, 
      required: true 
    },
    rating: {
      type: Number,
      min: 1,
      max: 5  
    },
    description: {
      type: String,  
    }
  })
  module.exports = mongoose.model('List', listSchema)