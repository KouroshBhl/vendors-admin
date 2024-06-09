import { v4 as uuidv4 } from 'uuid';

export default function fileReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'SET_UUID':
      let uniqueId;
      if (payload.actionType === 'edit') uniqueId = payload.uniqueId;
      else if (payload.actionType === 'duplicate') uniqueId = uuidv4();
      else uniqueId = uuidv4();

      return { ...state, uniqueId, actionType: payload.actionType };

    default:
      throw new Error('No action found!');
  }
}
