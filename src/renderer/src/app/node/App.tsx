import { Button } from '@/components/ui/button'

function NodeApp(): JSX.Element {
  const handleOpenBrowser = () => {
    window.windowIPC.openBrowserWindow()
  }

  return (
    <div className="w-full h-dvh flex items-center justify-center bg-background">
      <Button onClick={handleOpenBrowser}>Open Browser</Button>
    </div>
  )
}

export default NodeApp
