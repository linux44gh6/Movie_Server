import prisma from "../../../helpers/prisma"
import bcrypt from 'bcrypt'


const createUser = async (payload: any) => {

    const existingUser = await prisma.users.findFirst({
        where: {
            email: payload.email
        }
    })
    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const hashPassword: string = await bcrypt.hash(payload.password, 12)
    const result = await prisma.users.create({
        data: {
            ...payload,
            password: hashPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            createAt: true,
            updateAt: true
        }
    })

    return result
}

const loginUser = async (payload: any) => {

}


export const UserServices = {
    createUser,
    loginUser
}
