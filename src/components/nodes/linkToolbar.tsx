
import React, { useState, useEffect } from "react";
import { LinkIcon, SaveIcon } from "../atom/icons";
import { useNavigate, Link } from "react-router-dom";

const LinkToolbar = ({ editmode, defaultLink, setLink }: { editmode: boolean, defaultLink: string, setLink: any }) => {
    const [showSelect, setShowSelect] = useState(false);
    const [pages, setPages] = useState([]);


    useEffect(() => {
        const storedPages = localStorage.getItem('charts');
        if (storedPages) {
            setPages(JSON.parse(storedPages));
        }
    }, []);

    const toggleSelect = () => setShowSelect(!showSelect)


    const save = (value: any) => {
        if (value) setLink(value)
        setShowSelect(false)
    }

    if (!editmode && defaultLink) {
        return (<Link to={defaultLink} target='_blank'><LinkIcon /></Link>)

    } else if (!editmode && !defaultLink) {
        return <LinkIcon />
    }

    if (!pages.length) return <div>Loading...</div>

    return (
        <>
            <button onClick={() => toggleSelect()}><LinkIcon /></button>
            {showSelect && <input type="text" value={defaultLink} id="pages" onChange={(e) => save(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />}


        </>
    );
}

export default LinkToolbar;