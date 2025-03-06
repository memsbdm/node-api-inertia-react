import { Head, Link } from '@inertiajs/react'

export default function VerifyEmailTokenValidation(props: {
  valid: boolean
}) {
  return (
    <>
      <Head title="Verify Email Token Validation" />
      
        <div className="flex flex-col items-center justify-center h-screen">
        {props.valid ? (
          <div>
            <h1>Your email has been verified</h1>
            <Link href={"/"}>Go to home page</Link>
          </div>
        ) : (
          <div>
            <h1>The token is invalid or expired</h1>
          </div>
        )}
      </div>
    </>
  )
}