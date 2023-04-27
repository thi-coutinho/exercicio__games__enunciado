import { prisma } from "config/database";


export async function createConsole(name: string) {
    return await prisma.console.create({data: {name}})
}

export async function countConsoles(){
    return await prisma.console.count()
}