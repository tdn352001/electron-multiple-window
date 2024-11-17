import { Input } from '@/components/ui/input'
import useGenerateSearchQuery from '@/hooks/use-generate-search-query'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface SearchBarProps {
  selectedTab?: TabState
}
const SearchBar = ({ selectedTab }: SearchBarProps) => {
  const [value, setValue] = useState(selectedTab?.url)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const generateSearchQuery = useGenerateSearchQuery()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) return

    const newUrl = generateSearchQuery(value)
    window.tabIPC.openUrl(newUrl)
  }

  useEffect(() => {
    if (selectedTab) {
      setValue(selectedTab.url)
    }
  }, [selectedTab?.url])

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <Input className="w-full" placeholder="Search" value={value} onChange={handleInputChange} />
    </form>
  )
}

export default SearchBar
