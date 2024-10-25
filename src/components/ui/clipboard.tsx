/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FF95m9DDDH8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { SVGProps, useEffect, useState } from "react"
import { JSX } from "react/jsx-runtime"

interface Props {
  data: string;
}

export default function ClipBoard({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(!isOpen) return;
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <TooltipProvider>
      <Tooltip open={isOpen}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => {
            setIsOpen(true);
            navigator.clipboard.writeText(data);
          }}>
            {data} <ClipboardIcon className="ml-2 h-4 w-4" />
          </Button>
        </TooltipTrigger>
        
        <TooltipContent>
          <p>Copiado!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ClipboardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}