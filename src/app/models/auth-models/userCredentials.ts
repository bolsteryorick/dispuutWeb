export interface UserLoginCredentials{
    Email: string;
    Password: string;
    AppInstanceId: string;
}

export interface UserRegisterCredentials{
    Email: string;
    Password: string;
}

export interface GoogleRegisterValues{
    Token: string;
    AppInstanceId: string;
}