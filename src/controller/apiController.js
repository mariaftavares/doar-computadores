
const statusReturn = (req,res) =>{
    try {
        res.status(200).send({alive: true})
    } catch (error) {
        res.status(500).send({
            message: error.message
          })
    }
}



module.exports ={
    statusReturn
}