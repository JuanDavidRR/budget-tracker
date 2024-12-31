//npm i uuid
//npm i --save-dev @types/uuid
import { v4 as uuidv4 } from "uuid";
import { Category, DraftExpense } from "../types";
import { Expense } from "../types/index";

export type BudgetActions =
  | {
      type: "ADD_BUDGET";
      payload: { budget: number };
    }
  | {
      type: "SHOW_MODAL";
    }
  | {
      type: "HIDE_MODAL";
    }
  | {
      type: "ADD_EXPENSE";
      payload: { expense: DraftExpense };
    }
  | {
      type: "DELETE_EXPENSE";
      payload: Expense["id"];
    }
  | {
      type: "GET_EXPENSE_ID";
      payload: Expense["id"];
    }
  | {
      type: "UPDATE_EXPENSE";
      payload: { expense: Expense };
    }
  | {
      type: "RESET_APP";
    }
  | {
      type: "FILTER_EXPENSES";
      payload: Category["id"];
    };

export type BudgetState = {
  budget: number;
  expenses: Expense[];
  showModal: boolean;
  editId: Expense["id"];
  currentCategory: Category['id']
};

const localStorageExpenses = (): Expense[] => {
  const lcExpenses = localStorage.getItem("expenses");
  return lcExpenses ? JSON.parse(lcExpenses) : [];
};

const localStorageBudget = (): number => {
  const lcBudget = localStorage.getItem("budget");
  return lcBudget ? +lcBudget : 0;
};

export const initialState: BudgetState = {
  budget: localStorageBudget(),
  expenses: localStorageExpenses(),
  showModal: false,
  editId: "",
  currentCategory: ''
};

//This function needs a drafexpense type as paremeter but will return an expense type element
const createExpense = (expense: DraftExpense): Expense => {
  //Creating the id for the added expense
  return {
    ...expense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === "ADD_BUDGET") {
    return { ...state, budget: action.payload.budget };
  }

  if (action.type === "SHOW_MODAL") {
    console.log(state.showModal);

    return { ...state, showModal: true };
  }
  if (action.type === "HIDE_MODAL") {
    //Setting the editId as empty to reset the form when the modal is closed
    return { ...state, showModal: false, editId: "" };
  }

  if (action.type === "ADD_EXPENSE") {
    const expense = createExpense(action.payload.expense);
    return {
      ...state,
      expenses: [...state.expenses, expense],
      showModal: false,
    };
  }

  if (action.type === "DELETE_EXPENSE")
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload
      ),
    };

  if (action.type === "GET_EXPENSE_ID") {
    console.log(action.payload);
    return {
      ...state,
      editId: action.payload,
      showModal: true,
    };
  }

  if (action.type === "UPDATE_EXPENSE") {
    return {
      ...state,
      expenses: state.expenses.map((expense) =>
        expense.id === state.editId ? action.payload.expense : expense
      ),
      showModal: false,
      //Setting the id as empty to reset the form
      editId: "",
    };
  }

  if (action.type === "RESET_APP") {
    return {
      ...state,
      expenses: [],
      budget: 0,
    };
  }

  if (action.type === "FILTER_EXPENSES") {    
    return {
      ...state,
      currentCategory: action.payload,
    };
  }

  return state;
};
