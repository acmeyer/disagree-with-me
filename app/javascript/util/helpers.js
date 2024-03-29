import _ from 'lodash';
import { AppToaster }  from '../components/common/AppToaster';

export function replaceById(originalCollection, newItem) {
  return originalCollection.map((originalItem) => {
    return replaceIfObj(originalItem, newItem);
  });
}

export function replaceIfObj(originalObj, newObj) {
  if (originalObj && (originalObj.id === newObj.id)) {
    return newObj;
  } 

  return originalObj;
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

export function handleAPIError(error, dispatch) {
  const message = _.get(error.response, 'data.error');
  if (error.response.status === 401) {
    dispatch({
      type: 'LOGGED_OUT',
    });
    AppToaster.show({ message: "You need to login again.", intent: "danger", icon: "error" });
  } else {
    AppToaster.show({ message: message, intent: "danger", icon: "error" });
    dispatch({
      type: 'API_ERROR',
      error: message
    });
  }
}