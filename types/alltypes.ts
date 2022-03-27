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
    bred_for: string,
    breed_group: string
    height: heightWeight
    id: number
    image: breedImage
    life_span: string
    name:string
    origin: string
    reference_image_id: string
    temperament: string
    weight: heightWeight
}