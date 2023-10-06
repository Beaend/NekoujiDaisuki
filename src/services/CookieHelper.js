class CookieHelper {
  setCookie(name, value, minutesToExpire = null) {
    const valueString = JSON.stringify(value)
    let cookieString = `${name}=${valueString}`

    if (minutesToExpire !== null) {
      const expirationDate = new Date()
      expirationDate.setTime(expirationDate.getTime() + minutesToExpire * 60 * 1000)
      cookieString += `; expires=${expirationDate.toUTCString()}`
    }

    document.cookie = cookieString
  }

  deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  getCookie(name) {
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(`${name}=`)) {
        const cookieValue = cookie.substring(name.length + 1)
        return decodeURIComponent(cookieValue)
      }
    }
    return null
  }
}

export default CookieHelper
