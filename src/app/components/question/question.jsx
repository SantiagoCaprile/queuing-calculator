export default function Question(props) {
  return (
    <div className="question bg-white text-black min-w-[400px] flex justify-between p-4 rounded-md">
      <div className="question__title">
        <h2>{props.question}</h2>
      </div>
      <div className="question__option">
        <div className="question__option__item">
          {
            <select>
              {props.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          }
        </div>
      </div>
    </div>
  );
}
