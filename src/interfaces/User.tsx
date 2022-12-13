export default interface User {
    name: string,
    email: string,
    password: string,
    link?: string,
    institution?: string,
    token?: string
}