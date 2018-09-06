import _ from 'lodash';

export function replaceById(originalCollection, newItem) {
  return originalCollection.map((originalItem) => {
    return replaceIfObj(originalItem, newItem);
  });
}

export function replaceIfObj(originalObj, newObj) {
  if (originalObj.id === newObj.id) {
    return newObj;
  } else {
    return originalObj
  }
}

export function toogleObjectById(collection, obj) {
  const selectedObj = _.find(collection, ['id', _.get(obj, 'id', NaN)]);

  if (selectedObj) {
    return _.without(collection, selectedObj);
  } else {
    return _.concat(collection, obj);
  }
}

export function appendOrReplaceById(originalCollection, newItem) {
  const match = _.find(originalCollection, {id: newItem.id});

  if (match) {
    return replaceById(originalCollection, newItem);
  } else {
    return [...originalCollection, newItem];
  }
}