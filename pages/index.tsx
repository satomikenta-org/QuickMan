import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Button, Column, Flex } from 'bumbag';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <Flex alignY="center" height="100vh">
      <Head>
        <title>QuickMan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Column style={{
          backgroundImage: "url(" + `${require("../public/hero.jpg")}` + ")",
          width: "100%",
          height: "100%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1 className={styles.title}>
          QuickMan
        </h1>
        
        <Button 
          palette="primary" 
          style={{ width: '400px', height: '50px', borderRadius: '20px', marginTop: '100px' }}
          onClick={() => router.push('/playground/')}
        >
          <span style={{ fontSize: '1.2rem' }}>Get started</span>
        </Button>
      </Column>
    </Flex>
  )
}
