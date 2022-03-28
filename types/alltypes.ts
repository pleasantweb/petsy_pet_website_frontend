export type user = {
    first_name?:string,
    last_name?:string,
    is_staff?:boolean,
    id?:number,
    email?:string
  }
export type breedImage={
    id: string,
    width: number,
    height: number,
    url: string
}
export type heightWeight={
    imperial: string,
    metric: string
}
export type breedType={
    id:number,
    breed:string,
    bred_for:string,
    life_span:string,
    temprament:string,
    origin:string,
    price:number,
    image:string,
    description:string
}
export type userProfile={
    id?:number,
    user?:number|null,
    session?:string
}
export type favouriteType={
    id:number,
    user:number,
    pet:breedType
}