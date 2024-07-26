import React, { useCallback, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { slugify } from '../../helper/utils';
import {
    useReactFlow, ReactFlowInstance, ReactFlowJsonObject,
} from 'reactflow';
import { SaveIcon, UndoIcon, ArrowLeftIcon } from '../atom/icons';
import { useSaveRestore } from '../../hooks/useSaveRestore';
import { useSWRConfig } from 'swr';
import Spinner from '../atom/spinner';

const actionBtnClass = "p-2 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 text-emerald-600 font-semibold"


export const SaveRestore: React.FC<{ reactFlowInstance: ReactFlowInstance }> = ({ reactFlowInstance }) => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { mutate } = useSWRConfig();

    const [searchParams, _] = useSearchParams();
    let slug = name;
    let title = searchParams.get('title');
    let parent = searchParams.get('parent');
    if (title) {
        slug = slugify(title);
    }

    const [flowData, isLoading, setFlowData] = useSaveRestore(name, {
        title: title,
        slug: slug,
        parent: ['', 'false', 'null', null].includes(parent) ? null : parent,
    });
    const { setViewport, toObject } = useReactFlow();

    const onSave = useCallback(async (event: any) => {
        event.preventDefault()
        if (isLoading) return;
        const flow: ReactFlowJsonObject = toObject();
        await setFlowData(flow);

        navigate(`/flowcharts/${slug}/edit`, { replace: true });

    }, [toObject, flowData, name]);

    const onRestore = useCallback(async () => {
        // event.preventDefault()

        const restoreFlow = async () => {
            // const flow: ReactFlowJsonObject = flowData;

            if (flowData) {
                const { x = 0, y = 0, zoom = 1 } = flowData.viewport;
                reactFlowInstance.setNodes(flowData.nodes || []);
                reactFlowInstance.setEdges(flowData.edges || []);
                // setViewport({ x, y, zoom: zoom || 0 });
            }
        }
        await restoreFlow();
    }, [flowData]);

    const goBack = useCallback(() => {
        navigate(-1);
    }, []);

    useEffect(() => {
        onRestore();
    }, [flowData]);

    return (
        <div className='inline-flex rounded-lg shadow-sm'>
            <button className={actionBtnClass} onClick={onSave}>{isLoading ? <Spinner sizeClass='w-5 h-5' /> : <div className='w-5 h-5'><SaveIcon width={20} height={20} /></div>}</button>
            {/* <button className={actionBtnClass} onClick={onRestore}><UndoIcon width={18} height={18} /></button> */}
            <button className={actionBtnClass} onClick={goBack}><ArrowLeftIcon /></button>
        </div>
    );
};