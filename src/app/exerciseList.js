"use client"

function getData() {
    fetch("api/route.js").then(res =>  { return res });
}

export default function ExerciseList({ user }) {
    // make a request to backend and return a list of exercises
    
    return <p>{getData()}</p>;
}