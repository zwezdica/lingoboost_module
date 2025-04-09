export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getLocalStorage = (key) => localStorage.getItem(key);
export const setLocalStorage = (key, value) => localStorage.setItem(key, value);

export const createElement = (tag, attributes = {}, children = []) => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element[key] = value;
    }
  });

  children.forEach((child) => element.appendChild(child));
  return element;
};
