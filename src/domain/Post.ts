import IAuthor from './Author'
import ICar from './Car'

export default interface IPost {
  id: number
  title: string
  car: ICar
  author: IAuthor
  isLiked: boolean
  images: string[]
}
