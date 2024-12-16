import type { PageServerLoad } from './$types';
import users from './data';

export const load: PageServerLoad = async () => {
    return {
        users
    };
};
