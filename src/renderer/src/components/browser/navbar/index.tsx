import { Button } from '@/components/ui/button'
import { useGoBack } from '@/hooks/tabs/use-go-back'
import { useGoForward } from '@/hooks/tabs/use-go-forward'
import { useSelectedTab } from '@/hooks/tabs/use-selected-tab'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SearchBar from './searchbar'

const Navbar = () => {
  const { tab } = useSelectedTab()
  const goBack = useGoBack()
  const goForward = useGoForward()

  return (
    <div className="size-full bg-background/80 flex items-center gap-8 px-4">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" disabled={!tab?.canGoBack} onClick={goBack}>
          <ArrowLeft />
        </Button>
        <Button variant="ghost" size="icon" disabled={!tab?.canGoForward} onClick={goForward}>
          <ArrowRight />
        </Button>
      </div>
      <SearchBar selectedTab={tab} />
    </div>
  )
}

export default Navbar
