import { isURL } from 'validator'

const useGenerateSearchQuery = () => {
  return (str: string) => {
    if (!str) return ''

    if (isURL(str)) return str

    return `https://www.google.com/search?q=${str}`
  }
}

export default useGenerateSearchQuery
