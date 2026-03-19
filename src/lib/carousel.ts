export function getWrappedIndex(index: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return ((index % total) + total) % total;
}

export function getNextIndex(current: number, total: number) {
  return getWrappedIndex(current + 1, total);
}

export function getPrevIndex(current: number, total: number) {
  return getWrappedIndex(current - 1, total);
}
