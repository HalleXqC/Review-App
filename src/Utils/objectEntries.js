const objectEntries = arr =>  Object.entries(arr).map(([id, value]) => {
    return {
        id,
        ...value
    }
})

export default objectEntries