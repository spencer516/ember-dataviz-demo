function sorted(values) {
  return [...values].sort((a, b) => (a > b ? 1 : -1));
}

export default function makeRanges(values) {
  const sortedValues = sorted(values);

  return sortedValues.reduce((ranges, current, index) => {
    if (index < sortedValues.length - 1) {
      const next = sortedValues[index + 1];
      ranges.push([current, next]);
    }

    return ranges;
  }, []);
}
