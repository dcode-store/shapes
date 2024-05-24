// @ts-nocheck
import React, { memo, useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Handle, Position, NodeToolbar, NodeResizer, useReactFlow } from 'reactflow';
import { SHAPES } from '../atom/shape';
import './shapeNode.css';

const AvailableColors = [
    "transparent",
    "rgb(207, 76, 44)",
    "rgb(234, 156, 65)",
    "rgb(235, 195, 71)",
    "rgb(67, 141, 87)",
    "rgb(63, 138, 226)",
    "rgb(128, 61, 236)",
];

const ShapeNode = ({ id, data, selected, ...other }: { id: string, data: any, selected: boolean, other: any }) => {
    let initWidth = other?.size?.width || data?.size?.width || 76;
    let initHeight = other?.size?.height || data?.size?.height || 76;
    const { setNodes } = useReactFlow();
    const [label, setLabel] = useState(data.label || "");
    const [size, setSize] = useState({ width: initWidth, height: initHeight });
    const [color, setColor] = useState(data?.color);

    useEffect(() => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    node.data.label = label;
                    node.data.color = color;
                    node.data.size = { width: node.width, height: node.height };
                }
                return node;
            })
        );
    }, [label, color]);

    useEffect(() => {
        setSize({ width: initWidth, height: initHeight });
    }, [initWidth, initHeight]);


    const changeColor = (chosenColor: string) => {
        setColor(chosenColor);
    };

    const onResize = useCallback((event: any, payload) => {
        const { width, height } = payload;
        setSize({ width, height });
    }, []);

    const Component = SHAPES[data?.type].component;
    return (
        <>
            <NodeToolbar isVisible={selected} position={Position.Top} className='shape-toolbar'>
                {AvailableColors.map((each, index) => {
                    let colorClass = (color == each) ? 'color-swatch active' : 'color-swatch';
                    if (each === 'transparent') {
                        colorClass += ' _transparent';
                    }
                    return <button key={index} className={colorClass} onClick={() => changeColor(each)} style={{ backgroundColor: each }}></button>
                })}
            </NodeToolbar>

            <NodeResizer onResize={onResize} color={color} isVisible={selected} minWidth={10} minHeight={10} />
            <Component width={size.width} height={size.height} color={color} />
            {
                [Position.Top, Position.Left, Position.Right, Position.Bottom].map(
                    (position) => (
                        <Handle key={`${position}`} id={`${position}`} type='source' style={{ backgroundColor: color, zIndex: 50, visibility: selected ? "visible" : "hidden" }} position={position} />
                    )
                )
            }
            <input type="text" className={data?.type === "subflow" ? "node-label-subflow" : 'node-label'} value={label} placeholder={data?.type} onChange={(e) => setLabel(e.target.value)} />
        </>
    );
}

export default memo(ShapeNode);