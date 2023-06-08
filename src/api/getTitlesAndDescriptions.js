export async function getTitlesAndDescriptions () {
    const reference = await fetch("https://run.mocky.io/v3/6102c1b2-254f-4b7c-addb-67d4df752866")
    const jsonData = await reference.json()
    return jsonData.reference
}
