import React from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { mutate } from 'swr';

import logo from '../../assets/logo.png';
import { GridIcon, UsersIcon, ChartIcon, RocketIcon, UserIcon, ExtensionIcon } from "./icons";


const Layout: React.FC = (props) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState(null as any);


    const dropdownTrigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    const sideBarTrigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    useEffect(() => {
        const loginDetails = JSON.parse(localStorage.getItem('auth') || '{}');
        setUser(loginDetails.user);
    }, []);

    // close on click outside sidebar
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                sideBarTrigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });


    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                dropdownTrigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ key }: KeyboardEvent) => {
            if (!dropdownOpen || key !== "Escape") return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });
    const clearCache = () => mutate(
        () => true,
        undefined,
        { revalidate: false }
    )


    const logout = (e: React.MouseEvent) => {
        e.preventDefault();
        clearCache()
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button type="button" ref={sideBarTrigger} onClick={() => setSidebarOpen(!sidebarOpen)} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src={logo} className="h-14 ms-1 me-3" alt="Logo" />
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <button ref={dropdownTrigger} onClick={() => setDropdownOpen(!dropdownOpen)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <UserIcon className="w-8 h-8 bg-stone-400 rounded-full text-white" width={24} height={24} />
                                </button>
                                <div
                                    ref={dropdown}
                                    onFocus={() => setDropdownOpen(true)}
                                    onBlur={() => setDropdownOpen(false)}
                                    className={`absolute z-50 text-base mt-56 -ml-16 list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${dropdownOpen ? "block" : "hidden"}`}
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                                            {user?.name}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                        </li>
                                        <li>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                        </li>
                                        <li>
                                            <a onClick={(e) => logout(e)} className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <aside ref={sidebar}
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform bg-white border-r border-gray-200 ${sidebarOpen ? "" : "-translate-x-full sm:translate-x-0"} dark:bg-gray-800 dark:border-gray-700`}
                aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul onClick={() => setSidebarOpen(false)} className="space-y-2 font-medium">
                        <li>
                            <NavLink to="/dashboard" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === "/dashboard" && "bg-gray-100"}`}>
                                <GridIcon />
                                <span className="ms-3">Dashboard</span>
                            </NavLink>
                        </li>
                        {user?.role === 'admin' && <li>
                            <NavLink to="/update-dashboard" className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === "/update-dashboard" && "bg-gray-100"}`}>
                                <ExtensionIcon />
                                <span className="flex-1 ms-3 whitespace-nowrap">Customize Dashboard</span>
                            </NavLink>
                        </li>}
                    </ul>
                </div>
            </aside>
            <Outlet />
        </>
    )
}

export default Layout;
