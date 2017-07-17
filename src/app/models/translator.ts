
import { TreeNode } from "app/models/tree-node.model";

export function translateToServer(nodes: TreeNode[], pid = null) {
    if (!nodes) {
        return [];
    }
    let entries = [];
    for (let node of nodes) {
        let translatedNode = translateToServer(node.children, node.id);
        entries = entries.concat(translatedNode);
        entries.push({ id: node.id, name: node.name, pid: pid });
    }
    return entries;
}

export function translateFromServer(data): TreeNode[] {
    if (!data) {
        return [];
    }
    let nodes = rootNodes(data);
    addNonRoots(nodes, data);
    return nodes;
}

function rootNodes(data) {
    return data
        .filter(datum => !datum.pid)
        .map(root => {
            return { id: root.id, name: root.name, children: [] };
        });
}

function find(nodes, id) {
    for (let node of nodes) {
        if (node.id === id) {
            return node;
        }
        let found = find(node.children, id);
        if (found) {
            return found;
        }
    }
    return null;
}

function addNonRoots(nodes, data) {
    for (let datum of data) {
        if (datum.pid) {
            let found = find(nodes, datum.pid);
            if (!found) {
                data.push(datum);//push back to handle once its parent has been handled.
            }
            else found.children.push({ id: datum.id, name: datum.name, children: [] });
        }
    }
}