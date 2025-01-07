export const isBoolean = (value: any) => typeof value === 'boolean'

export const isTrue = (value: any) => isBoolean(value) ? value === true : value === 'true'

export const isFalse = (value: any) => isBoolean(value) ? value === false : value === 'false'