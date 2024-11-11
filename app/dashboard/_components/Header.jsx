"use client";
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { useContext } from 'react';

const Header = () => {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    return (
        <div className='p-3 px-5 flex items-center justify-between shadow-md fixed w-full bg-white z-10'>
            <div className='flex gap-3 items-center'>
                <Image src={"/logo.png"} width={30} height={30} alt='logo' />
                <h2 className='text-xl font-bold'>Creati-v</h2>
            </div>
            <div className='flex gap-3 items-center'>
                <div className='flex items-center gap-2'>
                    <Image src={"/coin.png"} width={20} height={20} alt='token img' />
                    <h2>{userDetail?.credits}</h2>
                </div>
                <Button >Dashboard</Button>
                <UserButton />
            </div>
        </div>
    )
}

export default Header