import React from 'react'
import SelectTopic from './_components/SelectTopic'

const CreateNew = () => {
    return (
        <div className="md:px-10">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 p-10 shadow-md">
                {/* select topic */}
                <SelectTopic />
                {/* select style */}

                {/* Duration */}

                {/* Create Button */}
            </div>
        </div>
    )
}

export default CreateNew