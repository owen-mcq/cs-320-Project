export default function Form( {exercises} ) {
  return (
    <>
      {/* if exercises were successfully fetched */}
      {exercises.length > 0 && (
        <>
          <h1>Exercises</h1>
          <ul className="grid grid-cols-4 gap-4 items-center">
            {exercises.map((item, index) => (
              <li className="w-52 mx-4" key={index}>
                <div>
                  <p>Exercise: {item.name}</p>
                  <p>Equipment: {item.equipments}</p>
                  <div>
                    Instructions:
                    {item.instructions.map((step, stepIndex) => (
                      <p key={stepIndex}>{step}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
