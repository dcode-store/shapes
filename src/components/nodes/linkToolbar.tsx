// @ts-nocheck

import React from "react";
import { LinkIcon, SaveIcon } from "../atom/icons";
import { useNavigate, Link } from "react-router-dom";
import { getFlowchartPages, flowchartsEndpoint as cacheKey } from "../../api/dashboardApi";
import useSWR from 'swr';
import axios from "axios";
import { flowChartsHost } from "../../constants/urls";

const LinkToolbar = ({ editmode, defaultLink, setLink }) => {
    const navigate = useNavigate();
    const [showSelect, setShowSelect] = React.useState(false);

    const toggleSelect = () => setShowSelect(!showSelect)


    const save = (value) => {
        if (value) setLink(value)
        setShowSelect(false)
    }

    if (!editmode && defaultLink) {
        if (defaultLink.includes('http') && defaultLink.includes('://')) {
            return (<Link href={defaultLink} target='_blank'><LinkIcon /></Link>)
        } else {
            return (<Link to={`/flowcharts${defaultLink}`} target='_blank'><LinkIcon /></Link>)
        }
    } else if (!editmode && !defaultLink) {
        return <LinkIcon />
    }

    const { isLoading, error, data, mutate } = useSWR(cacheKey, getFlowchartPages, {
        onError(err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    console.log('Unauthorized');
                    navigate('/login');
                }
            } else {
                console.error('An unknown error occurred', err);
            }
        }
    });
    const pages = data?.data;
    const options = pages.map((page: any) => {
        let title = page.title
        let value = ''
        if (page.resource.includes('mmd')) {
            value = `${flowChartsHost}/flowcharts${page.route}`
        } else {
            value = page.route
        }
        return <option key={page.id} value={value}>{page.title}</option>
    })

    options.unshift(<option key='default' value=''>Select a page</option>)

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <button onClick={() => toggleSelect()}><LinkIcon /></button>
            {showSelect && <select value={defaultLink} id="pages" onChange={(e) => save(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {pages && options}
            </select>}

        </>
    );
}

export default LinkToolbar;