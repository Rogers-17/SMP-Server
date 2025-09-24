const {verify} = require("jsonwebtoken");

const studentValidate = async (req, res, next) => {
    const studentToken = req.header("studentToken");
    if(!studentToken) return res.status(402).json({message: "Token not FOUND!"});

    try{
        const studentvalidate = verify(studentToken, "Importantsecret");
            req.student = studentvalidate;

            if (studentvalidate) {
                return next();
            }
    }catch(error){
        console.error("Student authentication error", error)
        return res.status(401).json({message: "Token is not valid"});
    }
}

module.exports = {studentValidate};