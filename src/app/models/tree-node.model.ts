export class TreeNode {
    id: number;
    name: string;
    children?: TreeNode[];
    parentId?: number;
    constructor(pid: number) {
        this.name = 'default name';
        this.parentId = pid;
    }
}