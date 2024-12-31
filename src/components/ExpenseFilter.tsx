import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

function ExpenseFilter() {
  const { dispatch } = useBudget();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    
    dispatch({
      type: "FILTER_EXPENSES",
      payload: e.target.value,
    });
  };
  return (
    <section className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className=" w-full flex flex-col md:flex-row items-center justify-center space-x-5">
          <label htmlFor="category">Select a category</label>
          <select
            name="category"
            id="category"
            className="bg-slate-200 p-3 flex-1 rounded"
            onChange={handleChange}
          >
            <option value="">-- All categories --</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  );
}

export default ExpenseFilter;
