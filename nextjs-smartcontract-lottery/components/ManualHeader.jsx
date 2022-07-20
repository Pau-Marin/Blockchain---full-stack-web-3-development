import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled } = useMoralis()

    useEffect(() => {
        console.log("HI!")
        console.log(isWeb3Enabled)
    }, [isWeb3Enabled])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {accoun.slice(0, 6)}...{accounts.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
