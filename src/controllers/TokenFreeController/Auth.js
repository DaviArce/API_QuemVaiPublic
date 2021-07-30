const UserServices = require('../../services/UsersServices');
const Crypt = require('../../utils/Crypt');

class Auth{

       static async login(req,res,next){
         const {email} = req.body;
         const password = req.header('x-password');
        try{
            
            const result = await UserServices.getUsersByEmail(email);
            if(!result[0]){
                return res.status(400).send('Invalid email or password');
            }
            const validPassword = await Crypt.compareHash(password,result[0].password);
            
            if(!validPassword){
                return res.status(400).send('Invalid email or password');
            }

            if(result[0].status === "deleted" || result[0].status === "banned"){
                return res.status(401).send("Invalid account");
            }
            const token = await Crypt.generateToken(email);
            res.send({"User token":token});
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = Auth;
