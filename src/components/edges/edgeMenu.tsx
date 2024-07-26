import React from 'react';
import { useReactFlow } from 'reactflow';

interface Position {
    top: number;
    left: number;
}

interface EdgeMenuProps {
    position: Position;
    edge: any | null;
    onClose: () => void;
}

const EdgeMenu: React.FC<EdgeMenuProps> = ({ position, edge, onClose }) => {
    const { setEdges } = useReactFlow();
    if (!edge) return null;

    const style = {
        top: position.top,
        left: position.left
    };

    const handleEdgeTypeChange: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        const newType = event.currentTarget.value;
        setEdges((edges) =>
            edges.map((item) =>
                item.id === edge.id ? { ...item, pathOptions: newType } : item
            )
        );
        onClose();
    };

    return (
        <div style={style} className="absolute z-20 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" onClick={onClose}>
            <div className="py-1" role="none">
                <button value="default" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleEdgeTypeChange}>Default</button>
                <button value="smoothstep" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleEdgeTypeChange}>SmoothStep</button>
                <button value="straight" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleEdgeTypeChange}>Straight</button>
                <button value="simplebezier" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={handleEdgeTypeChange}>SimpleBezier</button>
            </div>
        </div>
    );
};

export default EdgeMenu;