export function FormField({ label, children, hint, required }) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required && <span className="text-plum-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

const baseInput =
  "w-full rounded-xl border border-ink/15 bg-alabaster px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint/60 transition focus:border-moss-500 focus:outline-none focus:ring-2 focus:ring-moss-100";

export function TextInput(props) {
  return <input {...props} className={`${baseInput} ${props.className || ""}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${baseInput} min-h-[100px] resize-y ${props.className || ""}`} />;
}

export function SelectInput({ children, ...props }) {
  return (
    <select {...props} className={`${baseInput} ${props.className || ""}`}>
      {children}
    </select>
  );
}
