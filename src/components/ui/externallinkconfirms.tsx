"use client"

import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

type ExternalLinkConfirmProps = {
  link: string
}

const ExternalLinkConfirm = ({ link }: ExternalLinkConfirmProps) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    window.open(link, "_blank")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
          className="text-blue-500 underline max-w-[80%] inline-block text-start break-words"
        >
          {link}
        </a>
      </PopoverTrigger>

      <PopoverContent className="w-96">
        <div className="text-sm text-muted-foreground">
          You are visiting the link{" "}
          <span className="font-medium text-black">{link}</span> outside the Fyndr domain. This link is not verified or secured by Fyndr. Do you want to continue?
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button size="sm" onClick={handleConfirm}>
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ExternalLinkConfirm
