'use server'

import queryer from '@/lib/querying';

async function storeWorkout(workout) {
    
}

export default async function request(_, form) {
    const data = form.entries().filter(([_, value]) => value === 'on').map(([key, _]) => key);
    // console.log(form)
    // const h_check_seperator = pattern => data.map((value) => {
    //     const match = value.match(pattern);
    //     if (match) {
    //         return match[1];
    //     }
    // }).filter(Boolean);
    // const equipment = h_check_seperator(/equipment_(.*)/);
    // const muscles = h_check_seperator(/parts_(.*)/);
    const workout = await queryer(Array.from(data), []);
    await storeWorkout(workout);
    return JSON.stringify(workout);
  }