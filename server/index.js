const express        = require("express") ;
const cors           = require('cors')
const app            = express();
const db             = require('./models')



app.use(cors());
app.use(express.json());

const Postroure= require('./route/Posts')
app.use('/posts',Postroure);

const Commentairepost= require('./route/Comments')
app.use('/comments' ,Commentairepost)

const PostUser = require('./route/Users')
app.use('/users',PostUser) ;

db.sequelize.sync().then( (req,res)=>{
    app.listen(3001,()=>{
        console.log("jereo jereo")
      })
})


