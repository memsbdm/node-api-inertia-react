interface FormErrorProps {
    label: string
  }
  
  export function FormError(props: FormErrorProps) {
    const { label } = props
  
    return <small className={'text-red-7 mb-2'}>{label}</small>
  }