const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware Setup
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static images
app.use('/uploads', express.static('uploads'));

// Token verification
const verifyToken = require('./app/middleware/verifyToken');
app.use(verifyToken);

// Global CORS & Logging Middleware
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});

app.use((req, res, next) => {
  console.log('Request URL : ', req.url);
  next(); // you were missing this to move to next handler
});

// DB & Routes
require('./app/routes')(app);
require('./app/config/db.config')(app);

// Start Server
app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`);
});




// const express = require('express')
// const app = express()
// const PORT = 4000
// const bodyParser = require("body-parser")
// const cors = require("cors")
// app.use(express.json());
// const verifyToken = require('./app/middleware/verifyToken');
// app.use(verifyToken)


// require('./app/routes')(app);
// require('./app/config/db.config')(app)

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     if (req.method === 'OPTIONS') {
//         return res.send(200);
//     } else {
//         return next();
//     }
// });

// app.use((req, res, next)=>{
//   console.log('Request URL : ',req.url)
//   })

// app.listen(PORT, ()=>
// {
//     console.log(`App is listening on PORT ${PORT}`)
// })