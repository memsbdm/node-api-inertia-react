import { tuyau } from '#inertia/core/providers/tuyau'
import { Head, useForm } from '@inertiajs/react'
import { useState, FormEvent } from 'react'

export default function VerifyEmailSent() {
  const { post, processing, errors } = useForm()
  const [isEmailSent, setIsEmailSent] = useState(false)
  function submit(event: FormEvent) {
    event.preventDefault()
    if (processing) {
      return
    }

    post(tuyau.$url('me.verify-email.resend'), {
      onBefore: () => {
        setIsEmailSent(false)
      },
      onSuccess: () => {
        setIsEmailSent(true)
      },
    })
  }
  return (
    <>
      <Head title="Email Verification Sent" />
      <div className="flex flex-col items-center justify-center h-screen">
        <p>
          We've sent you an email with a link to verify your email, please click on that link to
          continue.
        </p>
        <p>
          If you haven't received the email, please check your spam folder, or click on the button
          below.
        </p>
        <form onSubmit={submit}>
          <button type="submit" disabled={processing}>
            Resend
          </button>
        </form>
        {isEmailSent && <span>We've resent the email.</span>}
        {'code' in errors && errors.code === 'E_TOO_MANY_REQUESTS' && (
          <span>Retry after {errors.timer} second(s)</span>
        )}
      </div>
    </>
  )
}
