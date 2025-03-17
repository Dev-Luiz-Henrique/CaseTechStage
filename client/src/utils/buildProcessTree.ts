import { Process } from "../types/Process";

export interface ProcessTreeNode extends Process {
    children: ProcessTreeNode[];
}

export function buildProcessTree(processes: Process[]): ProcessTreeNode[] {
    const map: Record<string, ProcessTreeNode> = {};
    const tree: ProcessTreeNode[] = [];

    processes.forEach((process) => {
        map[process.id] = { ...process, children: [] };
    });

    Object.values(map).forEach((process) => {
        if (process.parentId)
            map[process.parentId]?.children.push(process);
        else
            tree.push(process);
    });

    return tree;
}
