import { useBudget } from "../hooks/useBudget";
import { useMemo } from "react";
import ExpenseDetail from "./ExpenseDetail";

function ExpensesList() {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      )
    : state.expenses;

  const isExpenseEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <section className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isExpenseEmpty ? (
        <div className="text-center space-y-5">
          <h2 className="text-center text-2xl font-bold text-slate-900">
            No expenses found 
          </h2>
          <p className="text-lg">
            Add some expenses and they will be listed here
          </p>
        </div>
      ) : (
        <section>
          <h2 className="text-center text-2xl font-bold text-slate-900">
            Your expenses
          </h2>

          <section>
            {filteredExpenses.map((expense) => (
              <ExpenseDetail expense={expense} key={expense.id} />
            ))}
          </section>
        </section>
      )}
    </section>
  );
}

export default ExpensesList;
