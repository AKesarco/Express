
function log (req, res, next){
    console.log("Logging...");
    next();//pass to  next function, if not  ending here it will hang
}

module.exports = log;