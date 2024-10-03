"use client";

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


const SelectTopic = ({ onUserSelect }) => {
  const Options = ["Custom Prompt", "Random AI Story", "Scary Story", "Historicals Facts", "Bed Time Story", "Motivational", "Fun Facts"];

  const [selectedOption, setSelectedOption] = React.useState("");
  return (
    <div>
      <h2 className="font-bold text-2xl text-primary">Content</h2>
      <p className="text-gray-500">what is the topic of your video?</p>
      <Select onValueChange={(value) => {
        setSelectedOption(value);
        value != "Custom Prompt" && onUserSelect('topic', value);
      }}>
        <SelectTrigger className="w-full text-lg mt-2 p-6">
          <SelectValue placeholder="Content Type" />
        </SelectTrigger>
        <SelectContent>
          {Options.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedOption === "Custom Prompt" && (
        <Textarea className="mt-3"
          onChange={(e) => onUserSelect('topic', e.target.value)}
          placeholder="Write prompt in which you want to genrate video." />
      )}
    </div>

  )
}

export default SelectTopic