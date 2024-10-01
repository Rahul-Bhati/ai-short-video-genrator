

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SelectTopic = () => {
    const Options = ["Custom"]
    return (
        <div>
            <h2 className="font-bold text-2xl text-primary">Content</h2>
            <p className="text-gray-500">what is the topic of your video?</p>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

        </div>
        
    )
}

export default SelectTopic