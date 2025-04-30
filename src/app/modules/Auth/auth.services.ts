import { Secret } from "jsonwebtoken"
import config from "../../../config"
import { jwtHelpers } from "../../../helpers/jwtHelpers"
import prisma from "../../../helpers/prisma"
import bcrypt from 'bcrypt'
import { sendEmail } from "../../../utils/sendEmail"

const loginUser = async (payload: any) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email
        }
    })

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password)

    if (!isCorrectPassword) {
        throw new Error('Invalid password')
    }

    const accessToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.jwt_secret as Secret, config.jwt.expires_in as string)


    const refreshToken = jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
        id: userData.id
    }, config.jwt.refresh_token_secret as Secret, config.jwt.refresh_token_expires_in as string)

    return {
        accessToken,
        refreshToken
    }
}

const forgetPassword = async (payload: { email: string }) => {

    const userData = await prisma.user.findFirstOrThrow({
        where: {
            email: payload.email
        }
    })

    const resetPassToken = jwtHelpers.generateToken({ email: userData.email, role: userData.role }, config.jwt.reset_password_secret as Secret, config.jwt.refresh_token_expires_in as string)
    const resetPasswordLink = config.jwt.reset_password_link + `?id=${userData.id}&token=${resetPassToken}`
    const replacements = {
        userName: userData.name,
        resetLink: resetPasswordLink,
    };
    const res = await sendEmail(userData.email, 'Reset your password within ten minutes!', 'resetPasswordEmail', replacements);
    return res
}

export const AuthServices = {
    loginUser,
    forgetPassword
}
