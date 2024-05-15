const express=require("express");
const app=express();

const users = [{
    name:"John",
    kidneys:[{
        health:false
    }]
}];

app.use(express.json());

app.get("/", function(req,res){
    //logic
    const johnKidneys=users[0].kidneys;
    const numberOfKidneys=johnKidneys.length;
    let numberOfHealthyKidneys=0;
    for(let i=0;i<johnKidneys.length;i++)
        {
            if(johnKidneys[i].healthy){
                numberOfHealthyKidneys+=1;
            }
        }

   const numberOfUnHealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;
   res.json({
    johnKidneys,
    numberOfHealthyKidneys,
    numberOfUnHealthyKidneys
   })
})

//middleware
app.post("/", function(req,res){
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy
    })
    res.json({
        msg:"Done"
    })
})

app.put("/", function(req,res){
    for(let i=0;i<users[0].kidneys.length;i++)
        {
            users[0].kidneys[i].healthy=true;
        }
        res.json({});
})

//removing all the unhealthy kidneys
app.delete("/", function(req,res){
   if(isThereAtLeastOneUnhealthKidney()){
    const newKidney=[];
    for(let i=0;i<users[0].kidneys.length;i++)
        {
            if(users[0].kidneys[i].healthy)
                {
                    newKidneys.push({
                        healthy:true
                    })
                }
        }
        users[0].kidneys=newKidney;
        res.json({msg:"done"})
    }
    else
    {
        res.status(411).json({
            msg:"you have no badkidneys"
        });
    }
})

function isThereAtLeastOneUnhealthKidney() {
    let atleastOneUnhealthKKidney=false;
    for(let i=0;i<users[0].kidneys.length;i++)
        {
            if(!users[0].kidneys[i].healthy)
                {
                    atleastOneUnhealthKKidney=true;
                }
        }
        return atleastOneUnhealthKKidney;
}



app.listen(3002);