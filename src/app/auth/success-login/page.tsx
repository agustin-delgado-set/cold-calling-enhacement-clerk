"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

function SuccessLoginPage() {
    const { user, isLoaded, isSignedIn } = useUser();

    const origin = localStorage.getItem("origin");
    console.log("origin", origin, user);

    useEffect(() => {
        if (window.opener && !window.opener.closed && isLoaded && user && origin) {
            const safeOrigin = new URL(decodeURIComponent(origin)).origin;
            const jwtToken = localStorage.getItem("clerk-db-jwt");

            const userDataToSend = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.emailAddresses[0].emailAddress,
                fullName: user.fullName,
                origin: safeOrigin,
                jwtToken,
            };

            window.opener.postMessage(userDataToSend, safeOrigin);

            if (isSignedIn) localStorage.removeItem("clerk-db-jwt");

            window.close();
        }
    }, [isLoaded, origin]);

    return (
        <div className="p-8">
            <img
                src="https://assets-global.website-files.com/61c515061446194a9d658e38/63df4bab2ae9b08c0bd18e6e_leadmagiclogo-p-500.webp"
                alt="Logo"
                width="100px"
            />
            <div className="flex flex-col items-center px-8 py-9">
                <h1 className="text-2xl font-semibold text-center">Success!</h1>
                <p className="text-center mt-2">
                    This window should close automatically. If it doesn't, you can close it manually.
                </p>
            </div>
        </div>
    );
}

export default SuccessLoginPage;
