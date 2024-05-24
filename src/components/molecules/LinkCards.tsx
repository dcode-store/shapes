// @ts-nocheck

import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LinkCardsProps {
    content?: any;
    loading?: boolean
    readOnly?: boolean
}

const LinkCards: React.FC<LinkCardsProps> = ({ content, loading }) => {
    const { pathname } = useLocation();
    return (
        <>
            <div className="grid grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                {loading && <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-48 rounded-lg"></div>}
                {content && Object.keys(content).map(
                    (key) => {
                        const item = content[key];
                        let type;
                        let route;
                        let target;

                        type = item?.url_type || item?.type;
                        route = item?.path ? item.path : item.url;
                        target = (type === "external") ? "_blank" : undefined;

                        return (
                            <Link key={key} to={route} target={target} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{content[key].title}</h5>
                                {/* {content[key].description && <p className="font-normal text-gray-700 dark:text-gray-400">{content[key].description}</p>} */}
                            </Link>
                        )
                    }
                )}
            </div>
        </>
    )
}

export default LinkCards;
