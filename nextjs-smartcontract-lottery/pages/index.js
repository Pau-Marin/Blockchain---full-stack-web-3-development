import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Smart contract lottery</title>
                <meta name="description" content="Out smart contract lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            Hello!
        </div>
    )
}
