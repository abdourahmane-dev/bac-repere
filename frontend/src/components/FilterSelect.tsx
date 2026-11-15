export type FilterOption = {
  value: number
  label: string
}

type FilterSelectProps = {
  id: string
  label: string
  placeholder: string
  value: number | null
  options: FilterOption[]
  disabled?: boolean
  loading?: boolean
  onChange: (value: number | null) => void
}

function FilterSelect({
  id,
  label,
  placeholder,
  value,
  options,
  disabled = false,
  loading = false,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        value={value ?? ''}
        disabled={disabled || loading}
        onChange={(event) => {
          const nextValue = event.target.value
          onChange(nextValue === '' ? null : Number(nextValue))
        }}
        className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
      >
        <option value="">{loading ? 'Chargement…' : placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelect
