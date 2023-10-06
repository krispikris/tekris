export const buildBoard = ({rows, columns}) => {
    const builtRows = Array.from({length: rows}, () => ({...defaultCell}))
    
    return {
        rows: builtRows,
        size: {rows, columns}
    };
};