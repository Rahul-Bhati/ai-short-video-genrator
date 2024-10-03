import React from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
AlertDialogTitle,
AlertDialogDescription
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

const CustomLoading = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col items-center my-10 justify-center'>
          <Image src={"/progress.gif"} width={100} height={100} alt='loading' />
          <h2>Genrating your video... Do not refresh</h2></div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading
