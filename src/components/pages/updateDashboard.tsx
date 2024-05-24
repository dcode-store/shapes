// @ts-nocheck

import React, { useCallback, useEffect, useState } from "react";
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
import Layout from "../atom/layout";
import { dashboardDetails, postDashboard, dashboardEndpoint as cacheKey } from "../../api/dashboardApi";
import useSWR from 'swr';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactJsonEditor from "../molecules/jsonEditor";

const actionBtnClass = "mt-5 py-3 px-4 inline-flex btn-outline rounded-s-lg rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-emerald-600 text-white shadow-sm hover:bg-emerald-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

const UpdateDashboard: React.FC = () => {
    const [json, setJson] = useState({});
    const navigate = useNavigate();

    const { isLoading, error, data: dashboardContent, mutate } = useSWR(cacheKey, dashboardDetails, {
        onError(err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    console.log('Unauthorized');
                    navigate('/login');
                }
            }
        }
    });

    useEffect(() => {
        if (dashboardContent?.data) {
            setJson(dashboardContent.data);
        }
    }, [dashboardContent, isLoading]);

    const handleChange = (value) => {
        try {
            setJson(value);
        } catch (error) {
            console.log("Invalid JSON", error);
        }
    }

    const handleError = (error) => {
        console.log("error", error);
    }

    const onSave = useCallback(async () => {
        await postDashboard(json)
        mutate(json)
    }, [json])


    return (
        <>
            <Layout />
            <div className="p-4 mt-16 sm:ml-64 w-full sm:w-2/3">
                {dashboardContent?.data && <ReactJsonEditor
                    json={json}
                    onChange={(value) => handleChange(value)}
                    ace={ace}
                    allowedModes={['code', 'tree']}
                    onError={handleError}
                    theme="ace/theme/github"
                />}
                <button className={actionBtnClass} onClick={onSave}>Save</button>
            </div>
        </>
    )
}

export default UpdateDashboard;