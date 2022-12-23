export interface IUserRegister {
    user: User[];
}

export interface User {
    durum:       boolean;
    mesaj:       string;
    kullaniciId?: string;
}
