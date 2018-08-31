import _ from 'lodash';

export function replaceById (originalCollection, newItem) {
  return originalCollection.map((originalItem) => {
    if (originalItem.id === newItem.id) {
      return newItem;
    } else {
      return originalItem;
    }
  });
}