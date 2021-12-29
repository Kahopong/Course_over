//front end js
//jquery

$(()=>{
    axios.get('/info/users').then((data)=>{
        console.log(data)
    })
})