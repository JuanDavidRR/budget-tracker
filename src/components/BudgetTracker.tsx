//npm i react-circular-progressbar
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";

function BudgetTracker() {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
            trailColor: "#dfdfdf",
            textSize: 8,
            textColor:  percentage === 100 ? '#DC2626' : '#3b82f6'
          })}
          text={`${percentage}% spent`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button onClick={()=> dispatch({type: 'RESET_APP'})}
          type="button"
          className="bg-pink-600 w-full p-2 text-center uppercase font-bold rounded-lg text-white"
        >
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={remainingBudget} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </section>
  );
}

export default BudgetTracker;
