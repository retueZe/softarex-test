export function parseLikeList(input: string): number[] | null {
    const list: any = JSON.parse(input)

    if (!Array.isArray(list)) return null
    if (!list.every((id: any): id is number => typeof id === 'number')) return null

    return list
}
export function formatLikeList(list: readonly number[]): string {
    return JSON.stringify(list)
}
