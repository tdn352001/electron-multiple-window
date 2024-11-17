import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useTabs } from '@/hooks/tabs/use-tabs'
import { Plus } from 'lucide-react'

const Sidebar = () => {
  const { tabs } = useTabs()

  const handleAddNewTab = () => {
    window.tabIPC.addNewTab()
  }

  const switchTab = (id: string) => {
    window.tabIPC.switchTab(id)
  }

  return (
    <div className="size-full p-6 pt-3 flex flex-col gap-3">
      <Button variant="secondary" onClick={handleAddNewTab}>
        <Plus />
        <span>New Tab</span>
      </Button>
      <Separator />
      <div className="flex flex-col gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            className="flex flex-col gap-px items-start py-2 h-auto w-full"
            variant="secondary"
            onClick={() => switchTab(tab.id)}
          >
            <span className="font-medium text-lg text-start w-full whitespace-nowrap text-ellipsis overflow-hidden">
              {tab.title}
            </span>
            <span className="text-xs opacity-60 text-start w-full whitespace-nowrap text-ellipsis overflow-hidden">
              {tab.url}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
