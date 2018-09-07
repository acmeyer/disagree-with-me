
const initial = {
  isVisible: false,
  reporting_type: null,
  data: null,
};

export function reportModalReducer(state = initial, action) {
  if (action.type === 'HIDE_REPORT_MODAL') {
    return {
      ...state,
      isVisible: false,
    }
  }
  if (action.type === 'SHOW_REPORT_MODAL') {
    return {
      ...state, 
      isVisible: true,
      reporting_type: action.reporting_type,
      data: action.data,
    };
  }

  return state;
}
