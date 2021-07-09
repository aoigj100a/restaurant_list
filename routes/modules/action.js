const express = require('express')
//載入express路由
const router = express.Router()
// 載入 model
const List = require('../../models/list')

//1.載入 multer 設定本地儲存區
const multer = require('multer')
let myStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
//設定上傳物件
let upload = multer({
    storage: myStorage,
    fileFilter: function (req, file, cb) {
        // if (file.mimetype != 'image/gif') {
        //     return cb(new Error('Wrong file type'));
        // }
        cb(null, true)
    }
});

//CRUD
//路線 /action/new 顯示新增的畫面 目前沒有做別的事
router.get('/new', (req, res) => {
    res.render('new')
})
// 路線 /action 1.做新增 2.導回首頁
router.post('/', upload.single('image'), async function (req, res) {
    //取得總文件數量
    //原本 ||  MyModel.findOne({}).then()
    //如果你使用await || await MyModel.findOne({}).exec() 
    const count = await List.countDocuments({}).exec();
    const id = count + 1
    const image = req.file.path.replace('public', "")
    const { name, name_en, category, location, phone, google_map, rating, description } = req.body
    return List.create({ id, name, name_en, category, image, location, phone, google_map, rating, description })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//路線edit
router.get('/:no', (req, res) => {

    List.findOne({ id: req.params.no }).lean()
        .then(lists => res.render('edit', { lists }))
        .catch(err => console.log(err))

})
router.put('/:no', (req, res) => {
    // console.log(req.params.no)
    const id = req.params.no
    const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
    return List.findOne({ id: req.params.no })
        .then(lists => {  
            lists.name = name
            lists.name_en = name_en
            lists.category = category
            lists.image = image
            lists.location = location
            lists.phone = phone
            lists.google_map = google_map
            lists.rating = rating
            lists.description = description
            return lists.save()
        })
        .then(() => res.redirect(`/show/${id}`))
        .catch(error => console.log(error))
})


router.get('/delete/:no', (req, res) => {
    List.findOne({ id: req.params.no }).lean()
        .then(lists => res.render('delete', { lists }))
        .catch(err => console.log(err))

})

router.delete('/delete/:no/y', (req, res) => {
    const id = req.params.no
    List.findOne({ id: id })
        .then(lists => lists.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router