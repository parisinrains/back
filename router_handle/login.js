const db = require('../db/index.js');

exports.register = (req, res) => {
  //req 是前端传过来的数据，也就是request，res是返回给前端的数据，也就是result
  const reginfo = req.body;
  //第一步，判断前端传过来的数据有没有空
  if (!reginfo.account || reginfo.password) {
    return res.send({
      statusL: 1,
      message: '账号或密码不能为空'
    })
  }
  //第二步，判断前端传过来的账号有没有已经存在在数据表中
  //需要使用mysql的select语句
  const sql = 'select * from users where account = ?';
  //第一个参数是执行语句，第二个是参数，第三个是一个函数，用于处理结果
  db.query(sql, reginfo.account, (err, results) => {
    if (results.length > 0) {
      return res.send({
        statusL: 1,
        message: '账号已存在'
      })
    }
    //第三步，对密码进行加密
    //需要使用中间件 bcrypt.js
    //bcrypt.hashSync第一个参数是传入的密码，第二个参数是加密后的长度
    reginfo.password = bcrypt.hashSync(reginfo.password, 10)
    // 第四步，把账号和密码插入到users表里
    const sql1 = 'insert into users set ?';
    //注册身份
    const identity = '用户';
    //创建时间
    const create_time = new Date();
    db.query(sql1, {
      account: reginfo.account,
      password: reginfo.password,
      //身份
      identity,
      //创建时间
      create_time,
      //用户初始未冻结状态为0
      status: 0
    }, (err, results) => {
      //第一个，插入失败
      //affectedRows为影响的行数，如果插入失败，就没有影响到行数，也就是行数不为1
      if (results.affectedRows !== 1) {
        return res.send({
          statusL: 1,
          message: '注册账号失败'
        })
      }
      res.send({
        statusL: 1,
        message: '注册账号成功'
      })
    })
  })

}

exports.login = (req, res) => {
  res.send('登录');
}