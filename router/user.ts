import express, { Router } from 'express'
// 路由处理函数
import {
  createFn,
  getInfoFn,
  updatePasswordFn,
  logoutFn,
  getAllRoutesFn,
  getRoutesFn,
  updateFn,
  updateAvatarFn,
  getRoleFn,
  getInfoAllFn,
  addCharacterFn,
  setCharacterFn,
  setRolesFn,
} from '../router-handler/user'

// 解析表单数据 form-data
import multer from 'multer'

// 上传用户头像图片
const storage = multer.diskStorage({
  //存储的位置 public在根目录下
  destination(req, file, cb) {
    cb(null, 'public/avatar/')
  },
  //图片名字的确定 multer默认帮我们取一个没有扩展名的图片名，因此需要我们自己定义给图片命名
  filename(req, file, cb) {
    cb(null, 'img' + file.originalname)
  },
})
// 创建一个multer实例
const upload = multer({ storage })

const router: Router = express.Router()

// 用户创建
router.post('/create', createFn)

// 获取用户信息
router.get('/info', getInfoFn)

// 获取全部用户信息
router.get('/allinfo', getInfoAllFn)

// 修改用户信息
router.post('/update', updateFn)

// 修改用户密码
router.post('/updatepassword', updatePasswordFn)

// 获取全部路由
router.get('/allroutes', getAllRoutesFn)

// 获取用户路由
router.get('/routes', getRoutesFn)

// 获取权限表数据
router.get('/role', getRoleFn)

// 新增职位
router.post('/characteradd', addCharacterFn)

// 修改职位信息
router.post('/characterset', setCharacterFn)

// 修改职位权限
router.post('/rolesset', setRolesFn)

// 用户退出
router.post('/logout', logoutFn)

// 更新用户头像
router.post('/avatar', upload.single('avatar'), updateAvatarFn)

export default router
