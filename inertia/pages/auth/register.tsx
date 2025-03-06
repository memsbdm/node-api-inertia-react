import { FormEvent } from 'react'
import { Link, useForm } from '@inertiajs/react'
import { AuthLayout } from '#inertia/components/auth/auth_layout'
import { tuyau } from '#inertia/core/providers/tuyau'
import { FormError } from '#inertia/components/form/form_error'
import { Submit } from '#inertia/components/form/submit'

export default function RegisterPage() {
    const { errors, post, processing, data, setData, reset } = useForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })
  
    function submit(event: FormEvent) {
      event.preventDefault()
  
      if (processing) {
        return
      }
  
      post(tuyau.$url('auth.register.execute'), {
        onFinish() {
          reset('password', 'passwordConfirmation')
        },
      })
    }
  
    return (
      <AuthLayout title="Register a new account">
        <form action="" method="POST" onSubmit={submit} className="w-80">
          <div className={'flex flex-col'}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={data.firstName}
              required
              onChange={(e) => setData('firstName', e.target.value)}
            />
            {errors.firstName && <FormError label={errors.firstName} />}
          </div>

          <div className={'flex flex-col'}>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={data.lastName}
              required
              onChange={(e) => setData('lastName', e.target.value)}
            />
            {errors.lastName && <FormError label={errors.lastName} />}
          </div>
          

          <div className={'flex flex-col'}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              required
              onChange={(e) => setData('email', e.target.value)}
            />
            {errors.email && <FormError label={errors.email} />}
          </div>
          

          <div className={'flex flex-col'}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              required
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <FormError label={errors.password} />}
          </div>
  
          <div className={'flex flex-col'}>
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              value={data.passwordConfirmation}
              required
              onChange={(e) => setData('passwordConfirmation', e.target.value)}
            />
          </div>
  
          <Submit label="Register" disabled={processing}></Submit>
        </form>
        <p>
          Already have an account?{' '}
          <Link href={tuyau.$url('auth.login.render')} className={'text-blue-5'}>
            Login
          </Link>
        </p>
      </AuthLayout>
    )
  }