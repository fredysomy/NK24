import { Fragment,useState,useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebase";
import { collection, addDoc ,doc} from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {getUserByEmail} from "../utils/searchbyEmail";
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Events", href: "#", current: false },
  { name: "About", href: "#", current: false },
  { name: "Profile", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const nav=useNavigate();
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  // icon import
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
       // Hide loader once the auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  const HamburgerIcon =
    "https://cdn.discordapp.com/attachments/1194336677548802058/1204080633077301248/Hamburger.png";
  const CloseIcon =
    "https://cdn.discordapp.com/attachments/1194336677548802058/1204136278199894097/Close.png";
  const NK24Logo =
    "https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/Compressed%2Fnk23logobright.webp?alt=media&token=8105818c-4e72-437c-8e5c-5f79e995a694";
  const SignInIcon =
    "https://cdn.discordapp.com/attachments/1194336677548802058/1204080632460873738/SignIn.png";
    const UserIcon="https://www.iconpacks.net/icons/1/free-user-login-icon-305-thumb.png";
  const handleSignIn=()=>{
    signInWithPopup(auth,provider).then((res) => {
      getUserByEmail(res.user.email).then((userData) => {
        if (userData) {
          
          // Proceed with user data
        } else {
          nav('/signup')
        }
      });
    }).catch((error) => {
      console.log(error.message)
    })
  }
  return (
    <Disclosure as="nav" className="bg-transsparent fixed  w-full backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 pb-3 lg:pb-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full pt-5 sm:p-6 lg:px-8">
            <div className="relative flex h-12 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (

                    <div className="block ml-1 h-10 w-10 ease-in" aria-hidden="true">
                      <img src={CloseIcon} alt="Menu icon" />
                    </div>
                  ) : (
                    <div className="block h-12 w-12 ease-in" aria-hidden="true">


                      <img src={HamburgerIcon} alt="Menu Icon" />
                    </div>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-20 w-20 sm:h-24 sm:w-24 "
                    src={NK24Logo}
                    alt="NK24Logo"
                  />
                </div>
                <div className="hidden sm:ml-5 sm:block p-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",

                          "rounded-md px-3 py-2 text-xl font-pop"

                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {
                currentUser ? <>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex  " onClick={()=>{console.log("success")}}>
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-12 w-12 sm:h-20 sm:w-20"
                        
                        src={UserIcon}
                        alt="User Menu"
                      />
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
                </> : <>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex  " onClick={()=>{handleSignIn()}}>
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-12 w-12 sm:h-20 sm:w-20"
                        
                        src={SignInIcon}
                        alt="User Menu"
                      />
                    </Menu.Button>
                  </div>
                  
                </Menu>
              </div>
                </>
              }
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}