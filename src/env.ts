export const dev = window.location.origin.includes('localhost')
// baseURL - to connect ot your backend or to your api...
export const baseURL = dev ? 'http://localhost:3000' : ''
// useSockets - disabled by default but feel free to enable
export const useSockets = false
// AUTH STUFF VVVV
export const domain = ''
export const clientId = ''
export const audience = ''