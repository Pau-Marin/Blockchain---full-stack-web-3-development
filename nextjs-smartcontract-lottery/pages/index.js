import Head from "next/head"
import styles from "../styles/Home.module.css"
import ManualHeader from "../components/ManualHeader"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart contract lottery</title>
                <meta name="description" content="Out smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ManualHeader />
            Hello!
        </div>
    )
}
