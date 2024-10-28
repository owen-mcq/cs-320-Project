export default function List( {exercises} ) {
    return (
      <>
        {exercises.length > 0 && (
          <div>
            <h1 className="text-xl font-bold mb-4">Exercises</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exercises.map((item, index) => (
                <div key={index} className="border p-4 rounded">
                  <p className="font-bold">Exercise: {item.name}</p>
                  <p>Equipment: {item.equipments}</p>
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
        )}
      </>
    );
  }