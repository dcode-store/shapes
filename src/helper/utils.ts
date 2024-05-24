

interface Item {
    title: string;
    resource: string;
    route: string;
    parent: string | null;
    children?: Record<string, Item>;
}

interface Data {
    [key: string]: Item;
}


// buildNestedArray
// Converts a flat object to a nested array

export const buildNestedArray = (parentId: string, pageData: Data) => {
    let data = pageData
    function recursiveFunc(parentId: string) {
        const children: any = Object.keys(data)
            .filter(key => data[key].parent === parentId)
            .map(key => ({
                ...data[key],
                children: recursiveFunc(key)
            }));
        return children.length > 0 ? children : null;
    }
    return recursiveFunc(parentId);
}

export const slugify = (...args: (string | number)[]): string => {
    const value = args.join(' ')

    return value
        .normalize('NFD') // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
        .replace(/\s+/g, '-') // separator
}