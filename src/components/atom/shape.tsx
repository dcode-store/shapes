// @ts-nocheck
// 
import React from "react";

const STROKE_COLOR = "#101827"



// Circle component
const CircleIcon: React.FC = ({ width = 26, height = 26, color = "rgb(234, 156, 65)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} fill="transparent" stroke={color} strokeWidth="1"></ellipse>
            </g>
        </svg>
    );
};

// Circle
const Circle: React.FC = ({ width = 76, height = 76, color = "rgb(234, 156, 65)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></ellipse>
            </g>
        </svg>
    );
};

// RoundRectangle
const RoundRectangleIcon: React.FC<{ width?: number, height?: number, color?: string }> = ({ width = 28, height = 28, color = "rgb(235, 195, 71)" }) => {
    return (
        <svg width={width} height={height} className="shape-svg">
            <g transform="translate(1, 1)">
                <rect x="0" y="0" rx="5.2" width="26" height="26" fill="transparent" stroke={color} strokeWidth="1"></rect>
            </g>
        </svg>
    );
};

const RoundRectangle: React.FC<{ width?: number, height?: number, color?: string }> = ({ width = 76, height = 76, color = "rgb(235, 195, 71)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <rect x="0" y="0" rx="12" width={width} height={height} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></rect>
            </g>
        </svg >
    );
};



// Rectangle
const RectangleIcon: React.FC = ({ width = 26, height = 26, color = "rgb(67, 141, 87)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <rect x="0" y="0" width={width} height={height} fill="transparent" stroke={color} strokeWidth="1"></rect>
            </g>
        </svg>
    );
};

const Rectangle: React.FC = ({ width = 76, height = 76, color = "rgb(67, 141, 87)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <rect x="0" y="0" width={width} height={height} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></rect>
            </g>
        </svg>
    );
};

// Hexagon component
const HexagonIcon: React.FC = ({ width = 26, height = 26, color = "rgb(63, 138, 226)" }) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d="M0,13 L2.6,0 L23.4,0 L26,13 L23.4,26 L2.6,26 Z" stroke={color} fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    );
};


const Hexagon: React.FC = ({ width = 76, height = 76, color = "rgb(63, 138, 226)" }) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path d={`M0,${halfHeight} L${width / 10},0 L${width - width / 10},0 L${width},${halfHeight} L${width - width / 10},${height} L${width / 10},${height} Z`} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};

// Diamond component
const DiamondIcon: React.FC = ({ width = 26, height = 26, color = "rgb(128, 61, 236)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d="M0,13 L13,0 L26,13 L13,26 Z" fill="transparent" stroke={color} strokeWidth="1"></path>
            </g>
        </svg>
    );
};


const Diamond: React.FC = ({ width = 76, height = 76, color = "rgb(128, 61, 236)" }) => {
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path d={`M0,${halfHeight} L${halfWidth},0 L${width},${halfHeight} L${halfWidth},${height} Z`} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


// ArrowRectangle component
const ArrowRectangleIcon: React.FC = ({ width = 26, height = 26, color = "rgb(63, 138, 226)" }) => {
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d="M0,0 L23.4,0 L26,13 L23.4,26 L0,26 Z" fill="transparent" stroke={color} strokeWidth="1"></path>
            </g>
        </svg>
    );
};

const ArrowRectangle: React.FC = ({ width = 76, height = 76, color = "rgb(63, 138, 226)" }) => {
    const arrowWidth = width * 0.1; // 10% of width
    const mainWidth = width - arrowWidth;
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path d={`M0,0 L${mainWidth},0 L${width},${height / 2} L${mainWidth},${height} L0,${height} Z`} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


// Cylinder component
const Cylinder: React.FC = ({ width = 76, height = 76, color = "rgb(234, 156, 65)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(1, 1)">
                <path
                    d="M0,9.5  L 0,66.5 A 38 9.5 0 1 0 76 66.5 L 76,9.5 A 38 9.5 0 1 1 0 9.5 A 38 9.5 0 1 1 76 9.5 A 38 9.5 0 1 1 0 9.5 z"
                    fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


const CylinderIcon: React.FC = ({ width = 26, height = 26, color = "rgb(234, 156, 65)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(2, 2)">
                <path
                    d="M0,3.25  L 0,22.75 A 13 3.25 0 1 0 26 22.75 L 26,3.25 A 13 3.25 0 1 1 0 3.25 A 13 3.25 0 1 1 26 3.25 A 13 3.25 0 1 1 0 3.25 z"
                    fill="transparent" stroke={color} strokeWidth="1"></path>
            </g>
        </svg>
    );
};


// Triangle component
const TriangleIcon: React.FC = ({ width = 26, height = 26, color = "rgb(235, 195, 71)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d={`M0,${height} L${width / 2},0 L${width},${height} Z`} fill="transparent" stroke={color} strokeWidth="1"></path>
            </g>
        </svg>
    );
};

const Triangle: React.FC = ({ width = 76, height = 76, color = "rgb(235, 195, 71)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path d={`M0,${height} L${width / 2},0 L${width},${height} Z`} fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


// Parallelogram component
const ParallelogramIcon: React.FC = ({ width = 26, height = 26, color = "rgb(63, 138, 226)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d="M0,26 L6.5,0 L26,0 L19.5,26 Z" stroke={color} fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    );
};

const Parallelogram: React.FC = ({ width = 76, height = 76, color = "rgb(63, 138, 226)" }) => {
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    const skewWidth = width / 4; // Adjust this value to change the skewness of the parallelogram
    return (
        <svg width={width + 4 + skewWidth} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path
                    d={`M0,${height} L${skewWidth},0 L${width},0 L${width - skewWidth},${height} Z`}
                    fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


// Plus
const PlusIcon: React.FC = ({ width = 26, height = 26, color = "rgb(63, 138, 226)" }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <path d="M8.666666666666666,0 L17.333333333333332,0 L17.333333333333332,8.666666666666666 L26,8.666666666666666 L26,17.333333333333332 L26,17.333333333333332 L17.333333333333332,17.333333333333332 L17.333333333333332,26 L17.333333333333332,26 L8.666666666666666,26 L8.666666666666666,17.333333333333332 L0,17.333333333333332 L0,8.666666666666666 L8.666666666666666,8.666666666666666 Z"
                    fill="transparent" stroke={color} strokeWidth="1"></path>
            </g>
        </svg>
    );
};


const Plus: React.FC = ({ width = 76, height = 76, color = "rgb(63, 138, 226)" }) => {
    const thirdWidth = width / 3;
    const thirdHeight = height / 3;
    let stroke = color;
    if (['', 'transparent'].includes(color)) stroke = STROKE_COLOR;
    return (
        <svg width={width + 4} height={height + 4} className="shape-svg">
            <g transform="translate(2, 2)">
                <path
                    d={`M${thirdWidth},0 L${2 * thirdWidth},0 L${2 * thirdWidth},${thirdHeight} L${width},${thirdHeight} L${width},${2 * thirdHeight} L${2 * thirdWidth},${2 * thirdHeight} L${2 * thirdWidth},${height} L${thirdWidth},${height} L${thirdWidth},${2 * thirdHeight} L0,${2 * thirdHeight} L0,${thirdHeight} L${thirdWidth},${thirdHeight} Z`}
                    fill={color} fillOpacity="0.7" stroke={stroke} strokeWidth="2"></path>
            </g>
        </svg>
    );
};


// subflow

const SubflowIcon: React.FC = ({ width = 26, height = 26 }) => {
    return (
        <svg width={width + 2} height={height + 2} className="shape-svg">
            <g transform="translate(1, 1)">
                <rect x="0" y="0" width={width} height={height} opacity="0.5" fill="transparent" stroke='currentColor' strokeWidth="1">
                </rect>
                <rect
                    opacity="0.5"
                    x="6"
                    y="6"
                    width="8"
                    height="8"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 9H19V19H9V9ZM15 11H17V17H11V15H15V11Z"
                    fill="currentColor"
                />
            </g>
        </svg>
    );
};

const Subflow: React.FC = ({ width = 76, height = 76 }) => {
    return Rectangle({ width, height, color: 'transparent' });
};


// Define SHAPES object
const SHAPES = {
    circle: {
        icon: CircleIcon,
        component: Circle,
        color: "rgb(234, 156, 65)",
    },
    "round-rectangle": {
        icon: RoundRectangleIcon,
        component: RoundRectangle,
        color: "rgb(235, 195, 71)",

    },
    rectangle: {
        icon: RectangleIcon,
        component: Rectangle,
        color: "rgb(67, 141, 87)",
    },
    hexagon: {
        icon: HexagonIcon,
        component: Hexagon,
        color: "rgb(63, 138, 226)",
    },
    diamond: {
        icon: DiamondIcon,
        component: Diamond,
        color: "rgb(128, 61, 236)",
    },
    "arrow-rectangle": {
        icon: ArrowRectangleIcon,
        component: ArrowRectangle,
        color: "rgb(63, 138, 226)",
    },
    cylinder: {
        icon: CylinderIcon,
        component: Cylinder,
        color: "rgb(234, 156, 65)",
    },
    triangle: {
        icon: TriangleIcon,
        component: Triangle,
        color: "rgb(235, 195, 71)",
    },
    parallelogram: {
        icon: ParallelogramIcon,
        component: Parallelogram,
        color: "rgb(63, 138, 226)",
    },
    plus: {
        icon: PlusIcon,
        component: Plus,
        color: "rgb(63, 138, 226)",
    },
    subflow: {
        icon: SubflowIcon,
        component: Subflow,
        color: "transparent",
    }
};

const MiniMapShape: React.FC = ({ id, height, width, color }) => {
    const type = id.split(":")[0];
    const Icon = SHAPES[type].icon;
    return <Icon width={width} height={height} color={color} />;
}

// Export SHAPES object
export { SHAPES, MiniMapShape };
