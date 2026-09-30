const MAX_COUNT = 10

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(Math.min(counter + 1, MAX_COUNT)))
  setCounter(0)
}
