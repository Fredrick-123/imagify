import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token} = req.headers;

    if(!token){
        return res.json({sucess:false, message:"Token not found"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.id){
            req.user = decoded.id;
        }else{
            return res.json({sucess:false, message:"Unauthorized Access"});
        }

        next();

    } catch (error) {
        res.json({sucess:false, message: error.message});
    }
}

export default userAuth;