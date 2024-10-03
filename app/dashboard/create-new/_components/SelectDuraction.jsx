import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const SelectDuraction = ({ onUserSelect }) => {
    return (
        <div className="mt-4">
            <h2 className="font-bold text-2xl text-primary">Duration</h2>
            <p className="text-gray-500">select the duration of your video?</p>
            <Select onValueChange={(value) => onUserSelect('duration', value)}>
                <SelectTrigger className="w-full text-lg mt-2 p-6">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="30 Second">30 Sec</SelectItem>
                    <SelectItem value="60 Second">60 Sec</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SelectDuraction