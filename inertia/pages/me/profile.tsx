import { Head } from "@inertiajs/react";
import type User from "#users/models/user";
export default function Profile(props: { user: User }) {
    return (
        <>
            <Head title="Profile" />

            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Profile</h1>
                <p>Welcome {props.user.firstName + ' ' + props.user.lastName}</p>
            </div>
        </>
    )
}