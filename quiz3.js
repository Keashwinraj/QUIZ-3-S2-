const express = require('express')
const app = express()
const port = 3000


app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)
    
    let result = login(req.body.username, req.body.password)

    
    res.send(result)
  })

app.get('/', (req, res) => {
  res.send('HELLO RPSK FAMILY!')
})

app.get('/bye', (req, res) => {
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