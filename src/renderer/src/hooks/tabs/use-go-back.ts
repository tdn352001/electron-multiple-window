export const useGoBack = () => {
  return () => {
    window.tabIPC.goBack()
  }
}
