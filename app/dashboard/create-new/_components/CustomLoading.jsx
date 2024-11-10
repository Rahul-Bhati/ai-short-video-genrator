import React from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

const CustomLoading = ({ loading, type }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col items-center my-10 justify-center'>
          <Image src={"/progress.gif"} width={100} height={100} alt='loading' />
          {type === "video" ? (
            <>
              <h2>Genrating your video... Do not refresh</h2>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4 rounded">
                <p className="text-yellow-700">
                  <span className="font-bold">Note:</span>"Please be patient; video generation may take up to 5 minutes as we are using free AI models."
                </p>
              </div>
            </>
          ) : (
            <h2>Genrating... Do not refresh</h2>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomLoading
