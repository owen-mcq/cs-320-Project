"use client"

import { useState, useEffect } from 'react';

export default function ExerciseList({ params }) {
    // make a request to backend and return a list of exercises
    const [json, setJSON] = useState(''); 
    useEffect(
        () => {
            fetch("api/?" + new URLSearchParams({muscle: ['dfa', 'dsd']})).then(res => res.text()).then(text => setJSON(text)) }
    );

    return <p>{json}</p>;
}
