import { useMemo, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpensesList from "./components/ExpensesList";
import ExpenseFilter from "./components/ExpenseFilter";
function App() {
  const { state } = useBudget();
  const isBudgetFilled = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
    localStorage.setItem("budget", state.budget.toString());
  }, [state.budget, state.expenses]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Budget tracker
        </h1>
      </header>

      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isBudgetFilled ? <BudgetTracker /> : <BudgetForm />}
      </section>

      {isBudgetFilled && (
        <main className="max-w-3xl mx-auto py-10">
          <ExpenseFilter/>
          <ExpensesList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
