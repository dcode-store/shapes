import { memo, useState, useCallback, useEffect } from 'react';
import { Handle, Position, NodeToolbar, NodeResizer, useReactFlow, useStoreApi } from 'reactflow';
import { TrashIcon, ExpandIcon, EditIcon, SaveIcon } from '../atom/icons';


const actionBtnClass = "p-2 inline-flex items-center gap-x-2 -ms-px first:rounded-s-lg first:ms-0 last:rounded-e-lg text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"

const EditableNode = ({ id, data, selected }: { id: string, data: any, selected: boolean }) => {
    const { setNodes, deleteElements } = useReactFlow();
    const [expand, setExpand] = useState(false);
    const [label, setLabel] = useState(data.label);
    const [editLabel, setEditLabel] = useState(false);

    const store = useStoreApi();

    useEffect(() => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    node.data.label = label;
                }
                return node;
            })
        );
    }, [label]);

    const onEdit = useCallback(() => {
        setEditLabel(!editLabel);
    }, [editLabel]);

    const onRemove = useCallback(() => {
        deleteElements({ nodes: [{ id }] });
    }, [id, deleteElements]);

    return (
        <>
            <NodeToolbar className="inline-flex rounded-lg shadow-sm" isVisible={selected} position={Position.Top}>
                <button onClick={onEdit} className={`${actionBtnClass} ${editLabel && 'text-emerald-600'}`}>{editLabel ? <SaveIcon width={24} height={24} /> : <EditIcon width={18} height={18} />}</button>
                <button onClick={() => setExpand(!expand)} className={`${actionBtnClass} text-blue-600`}><ExpandIcon width={18} height={18} /></button>
                <button onClick={onRemove} className={`${actionBtnClass} text-rose-600`}><TrashIcon width={20} height={20} /></button>
            </NodeToolbar >
            <NodeResizer color="#ff0071" isVisible={expand} minWidth={100} minHeight={30} />
            <div style={{ padding: '10px 20px' }}>
                {!editLabel && data.label}
                {editLabel && <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />}
            </div>

            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default memo(EditableNode);