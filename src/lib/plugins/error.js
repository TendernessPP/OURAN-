export function propertyIsRequired(target, propertyName) {
    if (!target[propertyName]) {
        throw new Error(`property ${propertyName} is required!`);
    }

}
