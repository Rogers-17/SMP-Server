const {verify} = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");

    if(!accessToken) return res.json({error: "User not logged in!"});

        try{
            const validateToken = verify(accessToken, "Importantsecret");
            req.user = validateToken;

            if (validateToken) {
                return next();
            }
        } catch(err) {
            return res.json({error: err})
        }
};

module.exports = {validateToken};