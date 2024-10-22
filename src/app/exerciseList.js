"use client"

import { useState } from 'react';

export default function ExerciseList({ user }) {
    // make a request to backend and return a list of exercises
    const [json, setJSON] = useState(''); 
    fetch("api").then(res => res.text().then(text => setJSON(text)));

    return <p>{json}</p>;
}