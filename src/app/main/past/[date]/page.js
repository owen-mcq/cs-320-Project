'use client';

import { getWorkouts, getWorkoutsClient } from '@/actions/getWorkouts';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
 
export default function Page() {
    const [state, setState] = useState([]);
    useEffect(() => {
        getWorkoutsClient()
        .then(res => JSON.parse(res))
        .then(json => setState(json));
    }, []);
    const workouts = getWorkoutsClient();
    const searchParamas = useSearchParams();
    console.log(searchParamas)
    return <p>Post: </p>
}