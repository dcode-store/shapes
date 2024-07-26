// @ts-nocheck

import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    MiniMap,
    addEdge,
    Controls,
    ControlButton,
    MarkerType,
    Panel,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    ConnectionMode,
    ReactFlowInstance
} from 'reactflow';
import 'reactflow/dist/style.css';
import exportIcon from '../../assets/export-16.png';
import ShapeNode from '../nodes/shapeNode';
import { Sidebar } from '../organisms/sidebar';
import { useParams, useSearchParams } from 'react-router-dom';
import { slugify } from '../../helper/utils';
import { SHAPES } from '../atom/shape';
import { toSvg, toPng, toJpeg } from 'html-to-image';
import EditableEdge from '../edges/editableEdge';
import EdgeMenu from '../edges/edgeMenu';

const nodeTypes = {
    shape: ShapeNode
}

const edgeTypes = {
    editableEdge: EditableEdge
}


const getNodeId = (type: string) => `${type}:${Date.now().toString(36) + Math.random().toString(36)}`;
const getDefaultColor = (type: string) => SHAPES[type].color;

const Shapes = ({ initialNodes = [], initialEdges = [] }) => {
    const { name } = useParams();
    const [searchParams, _] = useSearchParams();
    const [showPopup, setShowPopup] = useState(false);
    let slug = name;
    if (!name) {
        const title = searchParams.get('title') || 'Untitled';
        slug = slugify(title);
    }

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<any, any> | null>(null);

    const [contextMenu, setContextMenu] = useState(
        { visible: false, position: { top: 0, left: 0 }, edge: null }
    );


    const onConnect = useCallback(
        (params: any) => setEdges((els) => addEdge({
            ...params, type: "editableEdge", markerEnd: {
                type: MarkerType.ArrowClosed,
            }
        }, els)), [nodes],
    );

    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault();

        const menuWidth = 200;
        const menuHeight = 200;
        const { clientX, clientY } = event;

        const reactFlowWrapperRect = document.getElementById('react-flow-wrapper').getBoundingClientRect();

        const relativeX = clientX - reactFlowWrapperRect.left;
        const relativeY = clientY - reactFlowWrapperRect.top;


        setContextMenu({
            visible: true,
            position: {
                left: relativeX + menuWidth > reactFlowWrapperRect.width ? relativeX - menuWidth : relativeX,
                top: relativeY + menuHeight + 20 > reactFlowWrapperRect.height ? relativeY - menuHeight : relativeY + 20
            },
            edge: edge,
        });
    };
    const onPaneClick = useCallback(() => setContextMenu({ ...contextMenu, visible: false }), [setContextMenu]);

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

            const position = (reactFlowInstance as ReactFlowInstance).screenToFlowPosition({
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
                    ...newNode,
                    width: 150,
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

    const exportChart = (type: 'svg' | 'png' | 'jpeg') => {
        if (flowRef.current === null) return;

        const exportFunction = type === 'svg' ? toSvg : type === 'png' ? toPng : toJpeg;

        exportFunction(flowRef.current, {
            filter: node => !(
                node?.classList?.contains('react-flow__minimap') ||
                node?.classList?.contains('react-flow__controls') ||
                node?.classList?.contains('react-flow__panel')
            ),
        }).then(dataUrl => {
            const now = new Date();
            const time = now.toLocaleTimeString("en-US", { hour12: false });
            const a = document.createElement('a');
            a.setAttribute('download', `chart-${time}.${type}`);
            a.setAttribute('href', dataUrl);
            a.click();
        });

        setShowPopup(false);
    };

    const flowRef = useRef(null);

    return (
        <>
            <div className='flex justify-between items-center m-5'>
                <h1 className="text-4xl font-bold text-zinc-700 font-space-grotesk">Create Charts</h1>
                <a href="https://github.com/dcode-store/shapes" target="_blank" className="text-blue-500 hover:underline">
                    GitHub
                </a>
            </div>
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
                            connectionLineType={ConnectionLineType.Straight}
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            connectionMode={ConnectionMode.Loose}
                            ref={flowRef}
                            proOptions={{ account: "paid-pro", hideAttribution: true }}
                            onPaneClick={onPaneClick}
                            onEdgeContextMenu={onEdgeContextMenu}
                            fitView
                        >
                            <MiniMap
                                nodeStrokeColor={(node) => {
                                    if (node?.data?.type === "subflow") return "currentColor";
                                    return getDefaultColor(node?.data?.type)
                                }}
                                nodeColor={(node) => getDefaultColor(node?.data?.type)}
                                zoomable pannable />
                            <Controls>
                                <ControlButton onClick={() => setShowPopup(!showPopup)}>
                                    <img src={exportIcon} alt="Export" style={{ padding: '0.1em' }} />
                                </ControlButton>
                                {showPopup && (
                                    <div className='absolute bg-white rounded p-1 bottom-0 left-12'>
                                        <button className='text-xs p-1 hover:text-cyan-700' onClick={() => exportChart('svg')}>SVG</button>
                                        <button className='text-xs p-1 hover:text-cyan-700' onClick={() => exportChart('png')}>PNG</button>
                                        <button className='text-xs p-1 hover:text-cyan-700' onClick={() => exportChart('jpeg')}>JPEG</button>
                                    </div>
                                )}
                            </Controls>
                            <Panel position='top-left'>
                                <Sidebar />
                            </Panel>
                            {contextMenu.visible && <EdgeMenu
                                position={contextMenu.position}
                                edge={contextMenu.edge}
                                onClose={() => setContextMenu({ ...contextMenu, visible: false })}
                            />}
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </>
    );
};

export default Shapes;