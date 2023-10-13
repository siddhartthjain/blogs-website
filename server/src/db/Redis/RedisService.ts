import {redisclient} from './RedisConfig'

export const getByKey=async (name:string) => {
    try {
        const res =await redisclient.get(name);
        return res;
    } catch (error) {
        console.log(error);
    }
    
}

export const hset = async (key:string, obj: Record<string,any>)=>
{
   await redisclient.hSet(key,obj);
}

export const hget =async (key:string) => {
    try {
        return await redisclient.hGetAll(key);
    } catch (error) {
        console.log(error);
    }
    
}
export const hdel=async (key:string) => {
    try {
        return await redisclient.del(key);
    } catch (error) {
        console.log(error);
    }
    
}