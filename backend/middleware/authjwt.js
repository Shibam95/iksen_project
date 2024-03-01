const jwt = require('jsonwebtoken')

class AuthJwt {
  async userJwt(req, res, next) {
    try {
      const token=req.headers['usertoken']
      if (token) {
        jwt.verify(token, 'WTS10AC23D', (err, data) => {
          console.log(data)
          req.user = data
          next()
        })
      } else{
        res.status(400).json({
          stuats: false,
          message: "token required"
        })
      }
    } catch (error) {
      throw error
    }
  }

  async adminJwt(req, res, next) {
    try {
      const token=req.headers['admintoken']

      if (token) {
        jwt.verify(token, 'WTS10AC23D', (err, data) => {
          req.user = data
          console.log(req.user)
          next()
        })
      } else {
        res.status(400).json({
          stuats: false,
          message: "token required"
        })
      }
    } catch (error) {
      throw error
    }
  }


  

}

module.exports = new AuthJwt()
