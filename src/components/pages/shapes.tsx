import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    addEdge,
    Controls,
    MarkerType,
    Panel,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    ConnectionMode,
    ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import Layout from '../atom/layout';

import './shapes.css';

import ShapeNode from '../nodes/shapeNode';
import { Sidebar } from '../organisms/sidebar';
import { SaveRestore } from '../organisms/saveRestore';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { slugify } from '../../helper/utils';
import { SHAPES } from '../atom/shape';

const nodeTypes = {
    shape: ShapeNode
}


const getNodeId = (type: string) => `${type}:${Date.now().toString(36) + Math.random().toString(36)}`;
const getDefaultColor = (type: string) => SHAPES[type].color;

const Shapes = ({ initialNodes = [], initialEdges = [] }) => {
    const { name } = useParams();
    const [searchParams, _] = useSearchParams();
    let slug = name;
    if (!name) {
        const title = searchParams.get('title')
        slug = slugify(title);
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params: any) => setEdges((els) => addEdge({
            ...params, type: ConnectionLineType.SmoothStep, markerEnd: {
                type: MarkerType.ArrowClosed,
            }
        }, els)), [nodes],
    );


    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: any) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) return;
            if (reactFlowInstance === null) return;

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            let newNode = {
                id: getNodeId(type),
                type: 'shape',
                position,
                data: {
                    label: type, type: type
                }
            };
            if (type === 'subflow') {
                let nodeData = { ...newNode.data, size: { width: 150, height: 150 }, color: 'transparent' };
                newNode = {
                    ...newNode, width: 150,
                    height: 150,
                    style: {
                        zIndex: -1
                    },
                    data: nodeData
                }
            }

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance],
    );


    return (
        <>
            <Layout />
            <>
                <div className="sm:ml-64 mt-16">
                    <div className="rounded-lg dark:border-gray-700">
                        <ReactFlowProvider>
                            <div id='react-flow-wrapper' style={{ width: "100%", height: "calc(100vh - 4rem)" }}>
                                <ReactFlow
                                    nodes={nodes}
                                    edges={edges}
                                    onNodesChange={onNodesChange}
                                    onEdgesChange={onEdgesChange}
                                    onConnect={onConnect}
                                    onInit={setReactFlowInstance}
                                    onDrop={onDrop}
                                    onDragOver={onDragOver}
                                    connectionLineType={ConnectionLineType.SmoothStep}
                                    nodeTypes={nodeTypes}
                                    connectionMode={ConnectionMode.Loose}
                                    proOptions={{ account: "paid-pro", hideAttribution: true }}
                                    fitView
                                >
                                    <MiniMap
                                        nodeStrokeColor={(node) => {
                                            if (node?.data?.type === "subflow") return "currentColor";
                                            return getDefaultColor(node?.data?.type)
                                        }}
                                        nodeColor={(node) => getDefaultColor(node?.data?.type)}
                                        zoomable pannable />
                                    <Controls />
                                    <Panel position='top-left'>
                                        <Sidebar />
                                    </Panel>
                                    <Panel position='top-right'>
                                        <SaveRestore reactFlowInstance={reactFlowInstance} />
                                    </Panel>
                                </ReactFlow>
                            </div>
                        </ReactFlowProvider>
                    </div>
                </div >
            </>
        </>
    );
};

export default Shapes;