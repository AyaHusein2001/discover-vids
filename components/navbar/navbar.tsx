import React, {  useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { magic } from "@/lib/magic-client";
const NavBar = () => {
  const [usrEmail, setUsrEmail] = useState("");
  const [didToken, setDidToken] = useState("");

  useEffect(() => {
    const getEmail = async () => {
      if (!magic) {
        console.error("Magic instance is not initialized");
        return;
      }
      try {
        const { email } = await magic.user.getInfo();
        const idToken = await magic.user.getIdToken();
        setDidToken(idToken);
        console.log("🚀 ~ getEmail ~ didToken:", {idToken});
        if (email) {
          setUsrEmail(email as string);
        }
      } catch (err) {
        console.error("Failed to get email:", err);
      }
    };
    getEmail();
  }, []);
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropDown = (e:any) => {
    e.preventDefault();

    setShowDropDown(!showDropDown);
  };
  const handleOnClickHome = (e:any) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickMyList = (e:any) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  const handleSignOut = async (e:any) => {
    e.preventDefault();
    if (!magic) {
      console.error("Magic instance is not initialized");
      return;
    }
    try {
      await fetch("/api/logout",{
        method: "POST",
        headers: {
          Authorization: `Bearer ${didToken}`,
          "Content-Type": "application/json",
        }
      });
      console.log("User logged out");
      console.log("User logged out 2");

      console.log(await magic.user.isLoggedIn());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
    router.push("/login");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href='/'>
          <div className={styles.logoWrapper}>
            <Image src="/static/netflix.svg" alt="Netflix logo" width={128} height={34} />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome} >
            Home
          </li>
          <li className={styles.navItem2}   onClick={handleOnClickMyList} >
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropDown} >
              <p className={styles.username}>{usrEmail}</p>
              <Image src="/static/arrow_down.svg" alt="Expand drop down" width={24} height={24} />
            </button>    
            {showDropDown && <div className={styles.navDropdown}>
              <div>
                <a onClick={handleSignOut} className={styles.linkName}>
                  Sign out
                </a>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
            }
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
