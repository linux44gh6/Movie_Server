import jwt, { Secret, SignOptions } from "jsonwebtoken";


const generateToken = (payload: any, secret: Secret, expiresIn: string | number) => {
    const token = jwt.sign(payload, secret, {
        expiresIn,
        algorithm: 'HS256'
    } as SignOptions)
    return token
}


export const jwtHelpers = {
    generateToken
}
