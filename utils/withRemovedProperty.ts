export function withRemovedProperty<T extends object, K extends keyof T>(target: T, key: K): Omit<T, K> {
    const targetCopy = {...target}
    delete targetCopy[key]

    return targetCopy
}
