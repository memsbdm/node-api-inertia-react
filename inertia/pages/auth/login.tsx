import { Link, useForm } from '@inertiajs/react'
import type { FormEvent } from 'react'
import { AuthLayout } from '~/components/auth/auth_layout'
import { Submit } from '~/components/form/submit'
import { FormError } from '~/components/form/form_error'
import { tuyau } from '#inertia/core/providers/tuyau'

export default function LoginPage() {
  const { errors, post, processing, data, setData, reset } = useForm({
    email: '',
    password: '',
    isRememberMe: Boolean(false),
  })
  function submit(event: FormEvent) {
    event.preventDefault()

    if (processing) {
      return
    }

    post(tuyau.$url('auth.login.execute'), {
      onFinish() {
        reset('password')
      },
    })
  }

  return (
    <AuthLayout title="Sign in to your account">
      {'code' in errors && errors.code === 'E_INVALID_CREDENTIALS' && 'message' in errors && (
        <FormError label={errors.message as string} />
      )}

      <form onSubmit={submit} className="w-80">
        <div className={'flex flex-col'}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
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
        <div className={'flex gap-3 mt-2'}>
          <label htmlFor="isRememberMe">Remember me</label>
          <input
            id="isRememberMe"
            name="isRememberMe"
            type="checkbox"
            checked={data.isRememberMe}
            onChange={(e) => setData('isRememberMe', e.target.checked)}
          />
        </div>
        <Submit label="Login" disabled={processing}></Submit>
      </form>
      <p>
        Not a member yet?{' '}
        <Link href={tuyau.$url('auth.register.render')} className={'text-blue-5'}>
          Register
        </Link>
      </p>
    </AuthLayout>
  )
}
