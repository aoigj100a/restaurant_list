const express = require('express')
//載入express路由
const router = express.Router()

//路由設定開始
const index = require('./modules/index')
// 將網址結構符合 / 字串的 request 導向 show 模組 
router.use('/', index)

const show = require('./modules/show')
// 將網址結構符合 / 字串的 request 導向 show 模組 
router.use('/show', show)

const search = require('./modules/search')
// 將網址結構符合 / 字串的 request 導向 search 模組 
router.use('/search', search)

const action = require('./modules/action')
// 將網址結構符合 / 字串的 request 導向 action 模組 
router.use('/action', action)

module.exports = router