const { isNullOrUndefined } = require("util");

class staticAsync 
{
    
static getFormer(former)
{
    former++;
    console.log(former);
    return getFormer(former);
}
formerformer = 0;
getFormer(formerformer);
}