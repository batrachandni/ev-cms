import URLS from "./urlConstant";

export const checkAuth = (user, props) => {
  const {history, location:{pathname}} = props;
  if (!user) {
    history.push(URLS.Login);
  }
 else {
     history.push(pathname);
 }
};

export const removeState = name => {
  try {
    localStorage.removeItem(name);
  } catch (err) {
    console.log("Got error while removing data: ", err);
  }
};

export const loadState = (name = "") => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (name, data) => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    console.log("Got error while saving data: ", err);
  }
};

export const createCategoryOption = categoryListData => {
  if (categoryListData)
    return categoryListData.reduce((arr, category) => {
      return arr.concat({
        label: category.name,
        value: category.key,
        _id: category._id
      });
    }, []);
  return [];
};

export const renameKeysInArrOfObj = (
  arrToConvert,
  valueKeyNameConvertFrom,
  valueKeyNameConvertTo,
  labelKeyNameConvertFrom,
  labelKeyNameConvertTo
) => {
  let updatedArrOfObj = [];
  for (let key in arrToConvert) {
    updatedArrOfObj.push({
      [valueKeyNameConvertTo]: arrToConvert[key][valueKeyNameConvertFrom],
      [labelKeyNameConvertTo]: arrToConvert[key][labelKeyNameConvertFrom]
    });
  }
  return updatedArrOfObj;
};
