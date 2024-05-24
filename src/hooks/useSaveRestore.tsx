// @ts-nocheck

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { flowChartsHost } from '../constants/urls';
import { getFlowchartPages, getFlowchartResource, addFlowchart, getFlowchart } from '../api/dashboardApi';
import { useSWRConfig } from 'swr';

export const useSaveRestore = (
    name: string | undefined, params: {} | undefined
) => {
    const { pathname } = useLocation();
    const { mutate } = useSWRConfig();
    const [page, setPage] = useState<any>(null);
    const [flowData, setFlowData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const save = async (content: string) => {
        let payload: { [key: string]: any } = {};
        if (page) {
            payload = page;
        } else {
            payload = {
                title: params?.title,
                parent: params?.parent,
                slug: params?.slug,
            }
        }
        payload["content"] = content;
        setFlowData(content);
        setLoading(true);
        const data = await addFlowchart(payload);
        mutate(`${flowChartsHost}/${data.data.resource}`);
        setLoading(false);
        return data;
    }


    useEffect(() => {
        const fetchPage = async () => {
            if (name) {
                try {
                    const data = await getFlowchart(name);
                    setPage(data.data);
                    const resourceUri = `${flowChartsHost}/${data.data.resource}`;
                    const resource = await getFlowchartResource(resourceUri);
                    setFlowData(resource?.data);
                } catch (error) {
                    // console.log(error);
                    setPage(null);
                }
            }
        }
        fetchPage();
    }, [name]);
    return [flowData, loading, save]
}