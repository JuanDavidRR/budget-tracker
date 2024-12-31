// npm i react-date-picker
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
//npm i react-calendar
import "react-calendar/dist/Calendar.css";
import { categories } from "../data/categories";
import { useEffect, useState, useMemo } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

function ExpenseForm() {
  const { state, dispatch, remainingBudget } = useBudget();

  const [expense, setExpense] = useState<DraftExpense>({
    expenseName: "",
    amount: 0,
    category: "",
    date: new Date(),
  });

  const [error, setError] = useState("");
  //state to save the previous amount of the expense for the updates
  const [previousAmount, setPreviousAmount] = useState(0);
  const isEditIdValid = useMemo(() => state.editId !== "", [state.editId]);

  //Loading form with the expense when the user clicks update
  useEffect(() => {
    if (state.editId) {
      const expenseToUpdate = state.expenses.filter(
        (currentExpense) => currentExpense.id === state.editId
      )[0];
      //finding the id of the expense and when it's find it, load the form
      if (expenseToUpdate) {
        setExpense(expenseToUpdate);
        setPreviousAmount(expenseToUpdate.amount);
      }
    }
  }, [state.editId, state.expenses]);

  const handleChangeDate = (value: Value) => {
    //Saving the values of the inputs on my state when the dats changes
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);
    setExpense({
      ...expense,
      //IF the field is amount, convert the value to a number
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validate if the form inputs are empty
    if (Object.values(expense).includes("")) {
      console.log(expense);

      setError("All fields are required");
      return;
    }

    //Validate that the budget is not exceeded
    if (expense.amount - previousAmount > remainingBudget) {
      setError("This expense exceed your budget");
      return;
    }

    //If the expense exists that means it needs to be updated
    if (state.editId) {
      dispatch({
        type: "UPDATE_EXPENSE",
        //we add the id from editId because this expense does not have one
        payload: { expense: { id: state.editId, ...expense } },
      });
      //if does not exist, add a new one
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: { expense },
      });
    }

    //Reset the form after submission
    setExpense({
      expenseName: "",
      amount: 0,
      category: "",
      date: new Date(),
    });

    setPreviousAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-600 p-2">
        {isEditIdValid ? "Update expense" : "Add expense"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2 mt-5">
        <label className="text-xl font-bold" htmlFor="expenseName">
          New spend
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Add the new for the new expense"
          className="bg-slate-200 p-2 rounded-lg"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Add the amount for the expense E.G. 100"
          className="bg-slate-200 p-2 rounded-lg"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl font-bold" htmlFor="categories">
          Categories
        </label>
        <select
          className="bg-slate-200 p-2 rounded-lg"
          name="category"
          id="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Select a category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xl font-semibold" htmlFor="amount">
          Date of the expense
        </label>
        <DatePicker
          value={expense.date}
          onChange={handleChangeDate}
          className="bg-slate-200 p-2 rounded-lg"
        />
      </div>
      <input
        className="bg-blue-600 cursor-pointer text-white p-3 w-full rounded-lg uppercase text-xl font-bold hover:bg-blue-800 duration-300"
        type="submit"
        value={isEditIdValid ? "Update expense" : "Add expense"}
      />
    </form>
  );
}

export default ExpenseForm;
