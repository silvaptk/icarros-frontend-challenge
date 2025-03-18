import IPost from '@/domain/Post'

export default function getPostMock(): IPost {
  return {
    author: {
      id: 1,
      city: 'Dummy City',
      email: 'dummy@email.com',
      name: 'John Doe',
      phone: '(13) 9 9999-9999',
      state: 'Dummy State',
    },
    car: {
      id: 1,
      brand: 'Dummy Brand',
      kilometers: 1,
      model: 'Dummy Model',
      modelYear: 1,
      price: 1,
      productionYear: 1,
    },
    id: 1,
    images: [],
    isLiked: false,
    title: 'Dummy Title',
  }
}
