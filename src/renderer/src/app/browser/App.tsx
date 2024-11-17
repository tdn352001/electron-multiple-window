import Navbar from '@/components/browser/navbar'
import Sidebar from '@/components/browser/sidebar'
import WebContent from '@/components/browser/web-content'

function BrowserApp(): JSX.Element {
  return (
    <div className="w-screen h-screen">
      <div className="size-full grid grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />
        <div className="grid grid-cols-1 grid-rows-[64px_minmax(0,1fr)]">
          <Navbar />
          <WebContent />
        </div>
      </div>
    </div>
  )
}

export default BrowserApp
