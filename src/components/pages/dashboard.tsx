import React from "react";
import Layout from "../atom/layout";
import LinkCards from "../molecules/LinkCards";
import { useLocation, useNavigate } from "react-router-dom";
import { dashboardDetails, dashboardEndpoint as cacheKey } from "../../api/dashboardApi";
import useSWR from 'swr';
import axios from "axios";

enum LinkType {
    external = "external",
    internal = "internal"
}

interface LinkContent {
    [key: string]: {
        title: string;
        url: string;
        description: string | null | undefined;
        type: LinkType
    }
}

const Dashboard: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const {
        isLoading, error, data: dashboardContent, mutate
    } = useSWR(cacheKey, dashboardDetails, {
        onError(err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 401) {
                    console.log('Unauthorized');
                    navigate('/login');
                }
            }
        }
    });

    // if (dashboardContent?.data !== undefined) {
    //     if (pathname === "/web_apps") {
    //         content = dashboardContent?.data?.web_apps;
    //     }
    // }
    const content = {
        "Item 1": {
            "title": "Item 1",
            "url": null,
            "description": "",
            "type": "internal"
        },
        "Item 2": {
            "title": "Item 2",
            "url": null,
            "description": "",
            "type": "internal"
        },
        "Item 3": {
            "title": "Exteral Link",
            "url": "https://example.com",
            "description": "",
            "type": "external"
        }
    }

    return (
        <>
            <Layout />
            <div className="p-4 sm:ml-64 mt-16">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <LinkCards content={content} loading={isLoading} />
                </div>
            </div>
        </>
    )
}


export default Dashboard;