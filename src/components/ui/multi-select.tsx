import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Option = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleUnselect = (option: string) => {
    onChange(selected.filter((s) => s !== option))
  }

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            onChange(selected.slice(0, -1))
          }
        }
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [selected, onChange]
  )

  const selectables = options.filter((option) => !selected.includes(option.value))

  return (
    <div className="relative">
      <div
        className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        onKeyDown={handleKeyDown}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            const selectedOption = options.find((o) => o.value === option)
            if (!selectedOption) return null
            return (
              <Badge
                key={option}
                variant="secondary"
                className="rounded hover:bg-secondary"
              >
                {selectedOption.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e: React.MouseEvent) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              // Delay closing to allow click events to fire
              setTimeout(() => setOpen(false), 200)
            }}
            placeholder={selected.length === 0 ? placeholder : undefined}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      {open && selectables.length > 0 && (
        <div className="absolute top-full z-10 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <div className="max-h-[200px] overflow-auto p-1">
            {selectables.map((option) => (
              <div
                key={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onClick={() => {
                  setInputValue("")
                  onChange([...selected, option.value])
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 