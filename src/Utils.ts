function QuickSort<T>(array: Array<T>): Array<T> {
  const arrayCopy = array.slice();

  if (arrayCopy.length <= 1) return arrayCopy;

  const randomIndex = Math.floor(Math.random() * arrayCopy.length);
  const pivot = arrayCopy.splice(randomIndex, 1)[0];

  const left = arrayCopy.filter((items) => items <= pivot);
  const right = arrayCopy.filter((items) => items > pivot);

  return [...QuickSort(left), pivot, ...QuickSort(right)];
}

function RemoveDuplications<T>(array: Array<T>): Array<T> {
  const arrayCopy = array.slice();

  return [...new Set(arrayCopy)];
}

export { QuickSort, RemoveDuplications };
