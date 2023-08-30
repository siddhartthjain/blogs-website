export default interface AuthContract
{
    findOneEmail(email:string): Record<string,any>
    createUser(inputs:Record<string,any>): Record<string,any>
}