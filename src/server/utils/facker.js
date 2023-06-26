import { faker } from '@faker-js/faker'

async function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }
    return code;
  }

export const createFakerProducts = async () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: await generateCode(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        stock: faker.commerce.price({min:1, max:10, dec:0}),
        category: faker.commerce.department(),
        thumbnails: faker.image.url()
    }
}