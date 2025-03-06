import { Head } from '@inertiajs/react'

export default function VerifyEmailSent() {
  return (
    <>
      <Head title="Email Verification Sent" />
      <div className="flex flex-col items-center justify-center h-screen">
        <p>
        We've sent you an email with a link to verify your email, please click on that link to
        continue.
      </p>
      </div>
    </>
  )
}
