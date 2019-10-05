function checkLogin(req, res, next) {
    if (req.session.user === undefined) {
        res.json({
            message: 'This operation requires login.'
        });
    } else {
        next();
    }
}

function checkAdmin(req, res, next) {
    if (req.session.user === undefined) {
        res.json({
            message: 'This operation requires login.'
        });
    } else {
        if (req.session.user.userState === 5) {
            next();
        } else {
            res.json({
                message: 'Permission denied.'
            });
        }
    }
}

module.exports = {
    checkLogin: checkLogin,
    checkAdmin: checkAdmin
};
