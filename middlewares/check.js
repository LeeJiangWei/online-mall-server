function checkLogin(req, res, next) {
    if (req.session.user === undefined) {
        res.json({
            message: 'This operation requires login.'
        });
    } else {
        next();
    }
}

module.exports = {
    checkLogin: checkLogin
};
