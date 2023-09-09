class SortObject {
  sort(object, key, order = 'asc') {
    object.sort((a, b) => {
      const valueA = Number(a[key]) || a[key]
      const valueB = Number(b[key]) || b[key]

      let sortOrder = 1
      if (order === 'desc')
        sortOrder = -1
      if (valueA < valueB)
        return -1 * sortOrder
      if (valueA > valueB)
        return sortOrder
      return 0
    })
    return object
  }

  sortObjectInGroupsByNumbers(object, key) {
    const sortedObject = {}
    for (const el of object) {
      const object = el[key]
      if (!sortedObject[object])
        sortedObject[object] = []
      sortedObject[object].push(el)
    }
    return sortedObject
  }
}

export default SortObject
