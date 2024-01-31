const AppResponse = (res, message, data) =>{
    res.json({
        message,
        data
    })
}
module.exports = AppResponse;