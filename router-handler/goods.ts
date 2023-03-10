import { Request, Response } from 'express'
import path from 'path'
import db from '../db'

// 添加商品分类
export const addCategoryFn = (req: Request, res: Response) => {
  const sqlStr = 'select * from category_table where `name` = ?'
  db.query(sqlStr, req.body.name, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.length > 0) return res.send({ code: 1, msg: '该种类已存在' })

    const sql = 'insert into category_table set ?'
    db.query(sql, req.body, (err2, results2) => {
      if (err2) return res.send({ code: 1, msg: err2.message })
      if (results2.affectedRows !== 1) return res.send({ code: 1, msg: '添加商品种类失败' })
      res.send({ code: 0, msg: '添加商品种类成功' })
    })
  })
}

// 获取商品分类
export const getCategoryFn = (req: Request, res: Response) => {
  const sqlStr = 'select * from category_table order by categoryID asc'
  db.query(sqlStr, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    res.send({ code: 0, msg: '获取商品分类成功', data: results })
  })
}

// 修改商品类别名称
export const setCategoryFn = (req: Request, res: Response) => {
  const { categoryID, name } = req.body
  const sqlStr = 'update category_table set name = ? where categoryID = ?'
  db.query(sqlStr, [name, categoryID], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '修改商品类名失败' })
    res.send({ code: 0, msg: '修改商品类名成功' })
  })
}

// 下架商品类
export const delCategoryFn = (req: Request, res: Response) => {
  const { categoryID } = req.body
  const sqlStr = 'update category_table set status = 1 where categoryID = ?'
  db.query(sqlStr, categoryID, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '下架商品类失败' })
    res.send({ code: 0, msg: '下架成功' })
  })
}

// 添加商品
export const addGoodsFn = (req: Request, res: Response) => {
  const pic = path.join('/goods', (req as any).file.filename)
  const goodsInfo = { ...req.body, pic }
  const sqlStr = 'insert into goods_table set ?'
  db.query(sqlStr, goodsInfo, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '添加商品失败' })
    res.send({ code: 0, msg: '添加商品成功' })
  })
}

// 获取全部商品
export const getGoodsListFn = (req: Request, res: Response) => {
  const sqlStr = 'select * from goods_table where isdel = 0'
  db.query(sqlStr, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    res.send({ code: 0, msg: '获取商品列表成功', data: results })
  })
}

// 修改商品
export const setGoodsFn = (req: Request, res: Response) => {
  const pic = path.join('/goods', (req as any).file.filename)
  const sqlStr = 'update goods_table set ? where goodsID = ?'
  db.query(sqlStr, [{ ...req.body, pic }, req.body.goodsID], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '修改商品失败' })
    res.send({ code: 0, msg: '修改商品成功' })
  })
}

// 上/下架商品
export const takeOffGoodsFn = (req: Request, res: Response) => {
  const sqlStr = 'update goods_table set status = ? where goodsID = ?'

  db.query(sqlStr, [req.body.status, req.body.goodsID], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '操作失败' })
    res.send({ code: 0, msg: '操作成功' })
  })
}

// 删除商品
export const delGoodsFn = (req: Request, res: Response) => {
  const sqlStr = 'update goods_table set isdel = 1 where goodsID = ?'

  db.query(sqlStr, req.body.goodsID, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message })
    if (results.affectedRows !== 1) return res.send({ code: 1, msg: '操作失败' })
    res.send({ code: 0, msg: '删除商品成功' })
  })
}
