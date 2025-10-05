import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Option {
    value: string
    label: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    emptyText?: string
    className?: string
}

export default function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items...",
    emptyText = "No items found.",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    )

    const toggleOption = (value: string) => {
        const newSelected = selected.includes(value)
            ? selected.filter((item) => item !== value)
            : [...selected, value]
        onChange(newSelected)
    }

    const handleRemove = (value: string, e: React.MouseEvent) => {
        e.stopPropagation()
        onChange(selected.filter((item) => item !== value))
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between", className)}
                >
                    <div className="flex gap-1 flex-wrap flex-1">
                        {selected.length > 0 ? (
                            <>
                                {selected.slice(0, 3).map((value) => {
                                    const option = options.find((opt) => opt.value === value)
                                    return (
                                        <Badge key={value} variant="secondary" className="mr-1">
                                            {option?.label}
                                            <span
                                                className="ml-1 rounded-full outline-none hover:bg-muted cursor-pointer"
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                }}
                                                onClick={(e) => handleRemove(value, e)}
                                            >
                                                <X className="h-3 w-3" />
                                            </span>
                                        </Badge>
                                    )
                                })}
                                {selected.length > 3 && (
                                    <Badge variant="secondary">+{selected.length - 3} more</Badge>
                                )}
                            </>
                        ) : (
                            <span className="text-muted-foreground">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <div className="p-2">
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="h-9"
                    />
                </div>
                <div className="max-h-64 overflow-auto p-1">
                    {filteredOptions.length === 0 ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                            {emptyText}
                        </div>
                    ) : (
                        filteredOptions.map((option) => {
                            const isSelected = selected.includes(option.value)
                            return (
                                <div
                                    key={option.value}
                                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                                    onClick={() => toggleOption(option.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            isSelected ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </div>
                            )
                        })
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}