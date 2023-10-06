import CookieHelper from '~/services/CookieHelper.js'

class CardsHider {
  constructor() {
    this.cookieHelper = new CookieHelper()
  }

  saveIdsArrayToHide(ids, type) {
    const cookieName = this.getCookieNameByType(type)
    this.cookieHelper.setCookie(cookieName, ids)
  }

  getHideIdsFromCookie(type) {
    const cookieName = this.getCookieNameByType(type)
    const rawIds = this.cookieHelper.getCookie(cookieName)
    return JSON.parse(rawIds)
  }

  hideCardsByCookieId(object, type) {
    const hideIds = this.getHideIdsFromCookie(type)
    return Object.values(object).filter(obj => !hideIds.includes(obj.id))
  }

  getCookieNameByType(type) {
    return `hide${type.charAt(0).toUpperCase() + type.slice(1)}`
  }
}

export default CardsHider
