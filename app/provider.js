"use client"
import { db } from '@/config/db';
import { Users } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
// import { useUser } from '@clerk/clerk-react'
import { eq } from 'drizzle-orm';
import React, { useEffect } from 'react'

const Provider = ({ children }) => {
    const { user } = useUser();

    useEffect(() => {
        console.log(user)
        user && isNewUser();
    }, [user])

    const isNewUser = async () => {
        const res = await db.select().from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress))

        console.log(res);

        if (!res[0]) {
            await db.insert(Users).values({
                name: user.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                imageUrl: user?.imageUrl
            })
        }
    }


    return (
        <div>{children}</div>
    )
}

export default Provider