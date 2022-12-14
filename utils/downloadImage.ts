export function downloadImage(url: string): Promise<void> {
    return fetch(url, {
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'cors'
        })
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = URL.createObjectURL(blob)
            forceDownload(blobUrl)
            URL.revokeObjectURL(blobUrl)
        })
}
function forceDownload(url: string) {
    const a = document.createElement('a')
    a.href = url
    a.download = ''
    document.body.appendChild(a)
    a.click()
    a.remove()
}
