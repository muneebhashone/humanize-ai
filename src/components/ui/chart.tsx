"use client"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipProps } from "recharts"
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export interface ChartTooltipProps extends Omit<TooltipProps<ValueType, NameType>, 'config'> {
  config: ChartConfig
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
}: ChartTooltipProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-white/95 p-3 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-900">
          {label}
        </span>
        <div className="flex flex-col gap-1.5">
          {payload.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: config[item?.name as string]?.color }}
              />
              <span className="text-sm text-gray-600">{config[item?.name as string]?.label}:</span>
              <span className="text-sm font-semibold text-gray-900">
                {item.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { Tooltip }