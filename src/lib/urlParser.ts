type PageNode = {
    name: string;
    path: string;
    children?: PageNode[];
};

/**
 * Sanitizes page names for URLs by encoding special characters.
 * @param name Raw page name
 * @returns URL-safe name
 */
function sanitizePageName(name: string): string {
    return encodeURIComponent(name);
}

/**
 * Parses a hierarchical path into a structured representation.
 * @param pathSegments Array of path segments (e.g., ["about", "our team"])
 * @returns PageNode hierarchy
 */
export function parsePagePath(pathSegments: string[]): PageNode {
    if (pathSegments.length === 0) {
        throw new Error("Path segments cannot be empty");
    }

    let currentPath = "";
    const rootNode: PageNode = {
        name: pathSegments[0],
        path: `/${sanitizePageName(pathSegments[0])}`,
    };
    let currentNode = rootNode;

    for (let i = 1; i < pathSegments.length; i++) {
        currentPath += `/${sanitizePageName(pathSegments[i])}`;
        const newNode: PageNode = { name: pathSegments[i], path: currentPath };

        if (!currentNode.children) {
            currentNode.children = [];
        }

        currentNode.children.push(newNode);
        currentNode = newNode;
    }

    return rootNode;
}
