export function DisplayList( {toptext, pexercises} ) {
  let exercises = pexercises.flat();
  return (
        <div>
          <h1 className="text-xl font-bold mb-4">{toptext} Workout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from(exercises).map((item, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-bold">Exercise: {item.name}</p>
                {}<p>Equipment: {item.equipment.length > 0 ? item.equipment : "No Equipment Required"}</p>
                <div>
                  <p className="font-bold mt-2">Instructions:</p>
                  {item.instructions.map((step, stepIndex) => (
                    <p key={stepIndex} className="mt-1">
                      {step}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}

export function MutableList( {exercises, setLocalState} ) {
  function deleteExercise(id) {
    setLocalState(Array.from(exercises.filter(exercise => exercise._id !== id)));
  }
  
    return (
          <div>
            <h1 className="text-xl font-bold mb-4">Today's Workout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from(exercises).map((item, index) => (
                <div key={item._id} className="border p-4 rounded">
                  <p className="font-bold">Exercise: {item.name}</p>
                  <p>Equipment: {item.equipments}</p>
                  <button onClick={() => deleteExercise(item._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                  <div>
                    <p className="font-bold mt-2">Instructions:</p>
                    {item.instructions.map((step, stepIndex) => (
                      <p key={stepIndex} className="mt-1">
                        {step}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
    );
  }