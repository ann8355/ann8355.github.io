import test_json from '../data/test.json';
import { SAVE_TEST } from '../actions';

function test(state = test_json, action){
    switch(action.type){
        case SAVE_TEST:
            let test = "TEST"; 
            return test;
        default:
            return state;
    }
}

export default test;