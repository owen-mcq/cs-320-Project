'use server'

import queryer from '@/lib/querying';

export default async function request(_, form) {
    const data = form.entries().filter(([_, value]) => value === 'on').map(([key, _]) => key);
    const equipment = data.map((value) => {
        const match = value.match(/equipment_(.*)/);
        if (match) {
            return match[1];
        }
    }).filter(Boolean);
    const muscles = data.map((value) => {
        const match = value.match(/parts_(.*)/);
        if (match) {
            return match[1];
        }
    }).filter(Boolean);
    return JSON.stringify(await queryer(Array.from(muscles), Array.from(equipment)));
  }