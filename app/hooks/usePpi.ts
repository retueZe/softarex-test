let ppi: number | null = null

export default function usePpi(): number {
    if (ppi !== null) return ppi

    const ppiTestElement = document.createElement('div')
    ppiTestElement.style.position = 'absolute'
    ppiTestElement.style.width = '1in'
    document.body.appendChild(ppiTestElement)
    ppi = ppiTestElement.offsetWidth
    document.body.removeChild(ppiTestElement)

    return ppi
}
