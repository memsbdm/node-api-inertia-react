interface SubmitProps {
    label: string
    disabled: boolean
  }
  
  export function Submit(props: SubmitProps) {
    const { label, disabled } = props
  
    return (
      <button
        type="submit"
        disabled={disabled}
        className={'border-none w-full cursor-pointer bg-blue-3 my-3 px-3 py-1 rounded-sm'}
      >
        {disabled ? 'Loading...' : label}
      </button>
    )
  }