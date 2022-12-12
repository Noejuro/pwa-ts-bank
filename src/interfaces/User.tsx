export default interface IUser {
    name: string,
    email: string,
    password: string,
    link?: string,
    institution?: string,
    token?: string
}