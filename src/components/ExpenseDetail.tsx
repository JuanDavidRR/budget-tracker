//npm i react-swipeable-list
import "react-swipeable-list/dist/styles.css";

import { useMemo } from "react";
import { formatDate } from "../helpers";
import { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { useBudget } from "../hooks/useBudget";
type ExpenseDetailProps = {
  expense: Expense;
};

function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const { dispatch } = useBudget();
  const { id, expenseName, amount, date } = expense;
  const categoryInfo = useMemo(
    () => categories.filter((category) => category.id === expense.category)[0],
    [expense]
  );

  //Left actions
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({ type: "GET_EXPENSE_ID", payload: id })}
      >
        Update
      </SwipeAction>
    </LeadingActions>
  );

  //Right actions
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({ type: "DELETE_EXPENSE", payload: id })}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <section className=" bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img
              className="w-20"
              src={`/icono_${categoryInfo.icon}.svg`}
              alt="expense icon"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-lg uppercase font-extrabold text-slate-700">
              {categoryInfo.name}
            </p>
            <p>{expenseName}</p>
            <p className="text-slate-600">{formatDate(date!.toString())}</p>
          </div>
          <AmountDisplay amount={amount} />
        </section>
      </SwipeableListItem>
    </SwipeableList>
  );
}

export default ExpenseDetail;
