/// @dev CONVENTION formatFoo -> string

import { formatUnits } from 'viem'

export function capitalize(s: string) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function commify(num: number | string | null): string {
  if (num === null || num === undefined) return ''

  // Ensure input is a number
  const inputNumber = typeof num === 'string' ? parseFloat(num) : num

  // Convert the number to a string and split it into integer and fractional parts
  const [integerPart, fractionalPart] = inputNumber.toFixed(2).split('.')

  // Add commas to the integer part using a regular expression
  const withCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // Return the formatted number with the fractional part, if any
  return fractionalPart ? `${withCommas}.${fractionalPart}` : withCommas
}

// shorten string to its maximum length using three dots
export function shortenString(string: string, length: number): string {
  if (!string) return ''
  if (length < 5) return string
  if (string.length <= length) return string
  return (
    string.slice(0, 4) +
    '...' +
    string.slice(string.length - length + 5, string.length)
  )
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function formatPercent(percentString: any) {
  const percent = parseFloat(percentString)
  if (!percent || percent === Infinity || percent === 0) {
    return '0%'
  }
  if (percent < 0.0001 && percent > 0) {
    return '<0.0001%'
  }
  if (percent < 0 && percent > -0.0001) {
    return '<0.0001%'
  }
  const fixedPercent = percent.toFixed(2)
  if (fixedPercent === '0.00') {
    return '0%'
  }
  if (Number(fixedPercent) > 0) {
    if (Number(fixedPercent) > 100000) {
      return `>100,000%`
    } else if (Number(fixedPercent) > 100) {
      return `${commify(percent?.toFixed(0))}%`
    } else {
      return `${fixedPercent}%`
    }
  } else {
    return `${fixedPercent}%`
  }
}

export function formatBalance(
  value: bigint | number,
  decimals = 18,
  maxFraction = 2
) {
  if (!value) return null
  const formatted: string =
    typeof value === 'string'
      ? value
      : typeof value === 'number'
      ? value.toString()
      : formatUnits(value, decimals)

  if (maxFraction > 0) {
    const split = formatted.split('.')
    if (split.length > 1) {
      return split[0] + '.' + split[1].substr(0, maxFraction)
    }
  }
  return formatted === '0' ? '0.0' : formatted
}
