import { Head, useForm } from "@inertiajs/react";
import type User from "#users/models/user";
import { tuyau } from "#inertia/core/providers/tuyau";
import { FormEvent } from "react";
import { Submit } from "#inertia/components/form/submit";
export default function Profile(props: { user: User }) {
    const { delete: destroy, processing } = useForm()
    function submit(event: FormEvent) {
        event.preventDefault()
        if (processing) {
            return
        }
        destroy(tuyau.$url('auth.logout.execute'))
    }
    return (
        <>
            <Head title="Profile" />

            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p>Welcome {props.user.firstName + ' ' + props.user.lastName}</p>
                <form onSubmit={submit}>
                    <Submit label="Logout" disabled={processing}></Submit>
                </form>
            </div>
        </>
    )
}