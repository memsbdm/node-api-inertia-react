import { ReactNode } from 'react'

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export function AuthLayout(props: AuthLayoutProps) {
  const { title, children } = props

  return (
    <div className={'h-screen flex flex-col justify-center items-center'}>
      <h1 className={'mb-5'}>{title}</h1>
      {children}
    </div>
  )
}