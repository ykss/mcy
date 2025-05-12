import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cn } from "../../lib/utils"

const DrawerContext = React.createContext<{ direction?: "right" }>({})

const Drawer = ({ direction, ...props }: DialogPrimitive.DialogProps & { direction?: "right" }) => (
  <DrawerContext.Provider value={{ direction }}>
    <DialogPrimitive.Root {...props} />
  </DrawerContext.Provider>
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DialogPrimitive.Trigger
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = DialogPrimitive.Close
DrawerClose.displayName = "DrawerClose"

const DrawerPortal = DialogPrimitive.Portal
DrawerPortal.displayName = "DrawerPortal"

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn("fixed  w-[450px] h-full inset-0  z-50 bg-black/50", className)} {...props} />
))
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({ className, children, ...props }, ref) => {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // 위치 및 너비 설정
          "fixed top-0 right-0 w-[60%] max-w-[60%] h-full z-50",
          // 애니메이션 설정
          "data-[state=open]:animate-drawer-in",
          "data-[state=closed]:animate-drawer-out",
          // 배경 및 스타일
          "bg-[#fffcf6] border-l rounded-tl-[20px] rounded-bl-[20px]",
          className,
        )}
        {...props}>
        <div className="flex items-center justify-between p-4 border-b"></div>
        <div className="flex flex-col h-full">{children}</div>
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("p-4 border-b", className)} {...props} />
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn("mt-auto p-4 border-t", className)} {...props} />
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DrawerDescription.displayName = "DrawerDescription"

export { Drawer, DrawerTrigger, DrawerContent, DrawerClose, DrawerOverlay, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription }
