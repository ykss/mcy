export interface MenuDrawerProps {
  open: boolean
  setOpen: (value: boolean) => void
  navigate: (path: string) => void
}
