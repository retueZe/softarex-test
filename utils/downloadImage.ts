export async function downloadImage(url: string): Promise<void> {
    const response = await fetch(url, {
        headers: new Headers({
            'Origin': location.origin
        }),
        mode: 'cors'
    })
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const pathSegments = new URL(url).pathname.split('/')
    const fileName = pathSegments[pathSegments.length - 1]
    forceDownload(blobUrl, fileName)
    URL.revokeObjectURL(blobUrl)
}
function forceDownload(url: string, fileName: string) {
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    a.remove()
}
