"use client"

function getData() {
    const res = fetch("api/route.js");
    console.log(res)
    return "hello"
}

export default function ExerciseList({ user }) {
    // make a request to backend and return a list of exercises
    
    return <p>{getData()}</p>;
}