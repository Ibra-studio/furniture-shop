import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import React from 'react'

export function OpenCartButton({
  className,
  quantity=0,
  ...rest
}: {
  className?: string
  quantity?: number
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-ink hover:text-ink cursor-pointer"
      {...rest}
    >
      <ShoppingBag  className="size-[22px]" strokeWidth={1.75} />
      {typeof quantity === 'number' && (
        <span className="absolute -bottom-0 -right-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-medium text-inverse shadow-sm">
          {quantity}
        </span>
      )}
    </Button>
  )
}