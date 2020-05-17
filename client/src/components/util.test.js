import { processMutationError } from './util';
import { API_ERROR } from '../constant/text';

describe('util unit testing', () => {
    it('processMutationError', () => {
        const err = {};
        expect(processMutationError(err)).toEqual(API_ERROR);
    });
});
