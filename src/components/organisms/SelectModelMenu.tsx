"use client";
import SelectBox from "@/components/molecules/select-box";
import {AcademicCapIcon, BoltIcon, ChevronDownIcon} from "@heroicons/react/24/outline";
import React from "react";

export interface IOption {
  name: string;
  description: string;
  value: string;
  icon?: any;
}
const options = [
  { name: "GPT-4", description: "With DALL·E, browsing and analysis Limit 40 messages / 3 hours", value: "GPT-4", icon: AcademicCapIcon },
  { name: "GPT-3.5", description: "Great for everyday tasks", value: "GPT-3.5", icon: BoltIcon },
];

export default function SelectModelMenu() {
  const selectedOption = (value: string) => {
    console.log(value)
  }
  return (
      <SelectBox label='ChatGPT 4'
                 options={options}
                 click={selectedOption}
                 icon={<ChevronDownIcon className="w-3"/>}
      />
  );
}
