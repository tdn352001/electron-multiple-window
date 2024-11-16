import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

export const cx = clsx

export const customTwMerge = extendTailwindMerge({
  extend: {
    theme: {},
    classGroups: {}
  }
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(cx(inputs))
}
