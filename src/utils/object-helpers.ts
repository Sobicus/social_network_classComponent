export const updateObjectInArray=(items:any,objectPropName:any, itemId:any, newObjectProps:any)=>{
    return items.map((el:any) => el[objectPropName] === itemId ? {...el, ...newObjectProps} : el)
}