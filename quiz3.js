const express = require('express')
const app = express()
const port = 3000
var jwt = require('jsonwebtoken');


app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)
    
    let result = login(req.body.username, req.body.password)

    let token = generateToken(result)
    res.send(token)

  })

app.get('/', (req, res) => {
  res.send('HELLO RPSK FAMILY!')
})

app.get('/bye', verifyToken, (req, res, next) => {
    res.send('I LOVE RPSK FAMILY!')
  })

  app.post('/register', (req, res) => {
    
    let result = register( req.body.username,req.body.password,req.body.name,req.body.email)
    
    res.send(result)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
let dbUsers = [
    
  {
  username: "rAJ",
  password: "12345",
  name: "RAJ",
  email: "b022110211@student.utem.edu.my"
  },
  {
  username: "rAJI",
  password: "123",
  name: "RAJI",
  email: "RAJI@student.utem.edu.my" 
  },
  {
  username: "KEASH",
  password: "1234",
  name: "KEASHWINRAJ",
  email: "KEASHWINRAJ@student.utem.edu.my"
  }
]
function login(reqUsername, reqPassword) {
  let matchUser =dbUsers.find(user => user.username == reqUsername)

  if(!matchUser) return "User not found!"
  if(matchUser.password ==reqPassword) {
      return matchUser
  } else {
      return "Invalid password"
  } 
}

function register (reqUsername, reqPassword, reqName, reqEmail) {
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: reqName,
      email: reqEmail,
  })
}
  function generateToken(userData) {
    const token = jwt.sign(userData, '12345', { expiresIn: 60 });

    return token
  }

  function verifyToken(req, res, next) {
    let header = req.headers.authorization
    console.log(header)

    let token = header.split(' ')[1]

    jwt.verify(token, '12345', function(err,decoded){
      if(err){
        res.send("Invalid Token")
      }

      req.user = decoded
      next()
    });
  }
