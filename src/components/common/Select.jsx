export default function Select({
  id,
  label,
  options,
  error,
  handleChange,
  value,
  icon,
  disabled = false
}) {
  const optionElements = options.map(({ value, label }) => (
    <option key={value} value={value}>{label}</option>
  ))

  return (
    <>
      <div className='input-container'>
        <select
          className={'input'}
          id={id}
          name={id}
          onChange={handleChange}
          value={value}
          disabled={disabled}
        >
          <option value='' disabled hidden>{label}</option>
          {optionElements}
        </select>
        {icon && <img className='icon' src={icon} alt='Arrow' />}
      </div>
      <div className='error-container'>
        {error && <p className='error'>{error}</p>}
      </div>
    </>
  );
}
