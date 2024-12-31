import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <div>
      <p className="text-2xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-slate-950">
          {formatCurrency(amount)}
        </span>
      </p>
    </div>
  );
}

export default AmountDisplay;
