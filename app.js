const express=require('express')
const ejs=express('ejs')
const path=require('path')

const app=express() 

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

let posts=[
    {
        username:'kavya',
        content:'I love coding'
    },
    {
        username:'manas',
        content:'hard work is important'
    },
    {
        username:'aditya',
        content:'I love coding'
    },
]


//index route
app.get('/posts',(req,res)=>{
    res.render('index.ejs', {posts})
})

// create route  new post
app.get('/posts/new',(req,res)=>{
    res.render('new.ejs')
})
//route for add new post
app.post('/posts',(req,res)=>{
    // console.log(req.body)
    let {username,content}=req.body ;
    posts.push({username,content})  ; // can store this post in backend also
    res.redirect('/posts')
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})