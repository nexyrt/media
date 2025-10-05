import React from "react"
import Select from "react-select"

type Option = {
  value: string
  label: string
}

interface SearchableSelectProps {
  options: Option[]
  value: Option | null
  onChange: (value: Option | null) => void
  placeholder?: string
}

export default function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
}: SearchableSelectProps) {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable
    />
  )
}
