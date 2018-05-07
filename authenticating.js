
function authenticating(req, res, next){
    console.log("Authenticating...");
    next();//pass to  next function, if not  ending here it will hang
}

module.exports = authenticating;