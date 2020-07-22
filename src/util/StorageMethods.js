
function setItemInStorage (name, value) {
  localStorage.setItem(name, value);
  return value;
}

function getItemInStorage (name) {
  return localStorage.getItem(name);
}

export {
  setItemInStorage,
  getItemInStorage
};
