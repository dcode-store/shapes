// @ts-nocheck

import React, { DragEvent, useRef } from 'react';
import { SHAPES } from '../atom/shape';
import './sidebar.css';

interface ShapeType {
    icon: React.ComponentType;
    component: React.ComponentType;
}

export const Sidebar = () => {
    const onDragStart = (event: DragEvent, type: string, ref: React.RefObject<HTMLDivElement>) => {
        event.dataTransfer.setData('application/reactflow', type);
        event.dataTransfer.effectAllowed = 'move';
        if (ref.current) {
            event.dataTransfer.setDragImage(ref.current, 0, 0);
        }
    };

    return (
        <div className='sidebar'>
            <div className='sidebar-items'>
                {
                    Object.keys(SHAPES).map((shape_type) => {
                        const Icon = SHAPES[shape_type].icon;
                        const Component = SHAPES[shape_type].component;
                        const ref = useRef<HTMLDivElement>(null);
                        return (
                            <div key={shape_type} className='sidebar-item' onDragStart={(event) => onDragStart(event, shape_type, ref)} draggable>
                                <Icon />
                                <div
                                    ref={ref}
                                    key={shape_type}
                                    className='sidebar-item-drag-image'
                                >
                                    <Component />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};