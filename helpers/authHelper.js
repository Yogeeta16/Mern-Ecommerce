/// hash kne k liye password ko 

import bcrypt from "bcrypt";
//yeh function hashkrne k liye h plain password ko lega or encrypt kr k vapis krega
export const hashPassword =async(password) =>{
    try {
        const saltRounds =10;
        const hashedPassword =await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

//data m check krega or hashed ko plain m convert krega or plaintext dega 
export const comparePassword =async(password,hashedPassword)=> {
    return bcrypt.compare(password,hashedPassword);
}



//