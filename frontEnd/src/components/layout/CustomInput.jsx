const CustomInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
}) => {
  return (
    <div className="mb-4">
      <label className="block ml-3 text-white text-sm font-bold mb-2">
        {label}
      </label>
      {type === "select" ? (
        <select
          className="appearance-none border ml-3 rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "datetime" ? (
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          type="datetime-local"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default CustomInput;
