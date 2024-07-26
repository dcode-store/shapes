import React, { useRef, useEffect } from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    getSimpleBezierPath,
    getSmoothStepPath,
    getStraightPath,
    useReactFlow,
} from 'reactflow';

const pathMap: { [key: string]: any } = {
    default: getBezierPath,
    straight: getStraightPath,
    simpleBezier: getSimpleBezierPath,
    smoothstep: getSmoothStepPath,
};

import './editableEdge.css';

export default function EditableEdge({
    id,
    pathOptions,
    sourceX,
    sourceY,
    targetX,
    targetY,
    label,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) {
    const { setEdges } = useReactFlow();
    let initLabel = '';
    if (typeof (label) === 'string') {
        initLabel = label;
    }
    const [edgeLabel, setEdgeLabel] = React.useState(initLabel);
    let getPath = pathMap[pathOptions] || pathMap.default;
    const inputRef = useRef<HTMLInputElement>(null);

    const [edgePath, labelX, labelY] = getPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });


    const handleLabelInput = (event: any) => {
        setEdgeLabel(event.target.value);
    };

    const updateEdgeLabel = () => {
        setEdges((edges) =>
            edges.map((edge) => {
                if (edge.id === id) {
                    edge.label = edgeLabel;
                }
                return edge;
            })
        );
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.width = `${Math.max(inputRef.current.value.length * 0.28, 1.5)}rem`;
        }
    }, [edgeLabel]);

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        fontSize: ".5rem",
                        pointerEvents: 'all',
                    }}
                    className="nodrag nopan"
                >
                    <input
                        ref={inputRef}
                        onBlur={updateEdgeLabel}
                        onChange={handleLabelInput} value={edgeLabel} placeholder='[ ]' className="bg-[#e2e8f0] text-center min-w-3" type="text" />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}
