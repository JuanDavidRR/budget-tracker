import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

function BudgetForm() {
  const { dispatch } = useBudget();
  const [budget, setBudget] = useState(0);

  const isBudgetValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "ADD_BUDGET",
      payload: { budget },
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-blue-600 font-bold text-center"
        >
          Define budget
        </label>
        <input
          type="number"
          id="budget"
          className="w-full bg-white border border-gray-300 p-3"
          placeholder="Enter your budget"
          name="budget"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        disabled={isBudgetValid}
        value="Define budget"
        className="bg-blue-600 hover:bg-blue-800 cursor-pointer w-full text-white p-3 font-black uppercase text-xl duration-300 disabled:opacity-50"
      />
    </form>
  );
}

export default BudgetForm;
