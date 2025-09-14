import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Login.module.css";
import { useRouter } from "next/router";
import { magic } from "@/lib/magic-client";
const Login = () => {
  const [email, setEmail] = useState("");
  const [usrMsg, setUsrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleOnChangeEmail = (e:any) => {
    const email = e.target.value;  
    setUsrMsg("");
    setEmail(email);
    
  };
  const handleLoginWithEmail = async (e:any) => {
    e.preventDefault();
    if (email) {
      if (email==="aya.ahmed2001.aa@gmail.com")
      {
        
        try {
          setIsLoading(true);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          const did = await magic.auth.loginWithEmailOTP({ email, showUI: true });

          console.log(`DID Token: ${did}`);

          if (did) {
            //it is wrong to set loading to false here , as the route needs some seconds
            // to take place , so we need to wait for that , set the loading to false when the route completes only
            // setIsLoading(false);
            router.push("/");
          }
        } catch (error) {
          setIsLoading(false);
          console.log("🚀 ~ handleLoginWithEmail ~ error:", error);
          setUsrMsg("Something went wrong logging in");
        }
      }
      else {
        setUsrMsg("Something went wrong logging in");
      }
    }
    else {
      setUsrMsg("Please enter a valid email address");
    }
    console.log("login with email");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href='/'>
            <div className={styles.logoWrapper}>
              <Image src="/static/netflix.svg" alt="Netflix logo" width={128} height={34} />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signInHeader}>Sign In</h1>
          <div className={styles.form}>
            <input onChange={handleOnChangeEmail} value={email} className={styles.emailInput} placeholder="Email address" type="text" />
            <p className={styles.userMsg}>{usrMsg}</p>
            <button disabled={isLoading} onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading ? "Loading..." : "Sign In"}</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
