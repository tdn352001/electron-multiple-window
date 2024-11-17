export const useGoForward = () => {
  return () => {
    window.tabIPC.goForward()
  }
}
