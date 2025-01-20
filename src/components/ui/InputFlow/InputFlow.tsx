import cx from "@/libs/cx";
import isEmpty from "@/libs/is-empty";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  defaultValue?: string;
}

export default function InputFlow({ label, className, ...props }: Props) {
  const hasErrors = props.error && !isEmpty(props.error);

  return (
    <div className="relative">
      <input
        type="text"
        id="floating_filled"
        className={cx(
          "peer block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-transparent dark:text-white dark:focus:border-blue-500",
          className,
          hasErrors &&
            "border-red-600 focus:border-red-500 dark:border-red-600 dark:focus:border-red-500"
        )}
        placeholder=" "
        defaultValue={props.defaultValue}
        {...props}
      />
      <label
        htmlFor="floating_filled"
        className={cx(
          "absolute start-2.5 top-3 z-10 origin-[0] -translate-y-[110%] scale-75 transform bg-white pl-1 pr-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[110%] peer-focus:scale-75 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500",
          hasErrors && "text-red-600 dark:text-red-600"
        )}
      >
        {label}
      </label>
      {props.error && (
        <p
          id="outlined_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          {props.error}
        </p>
      )}
    </div>
  );
}
