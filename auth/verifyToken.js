

export const isAuth=(req,res,next) =>{
    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer")){
        return res.status(403).json({message:"No Token no authorization"})
    }

    try {
        console.log(token)
        next();
    } catch (error) {
        console.log(error)
    }


}