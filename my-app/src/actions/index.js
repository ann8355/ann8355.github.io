export const SAVE_TEST = 'SAVE_TEST';

//建立 action creator
export function saveTest(id){
    const action = {
      type: SAVE_TEST,
      id
    }
    return action;
}