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
        title: faker.commerce.product(),
        description: faker.lorem.words().substring(3, 40),
        code: await generateCode(),
        price: faker.commerce.price(),
        stock: faker.commerce.price({min:1, max:10, dec:0}),
        category: faker.commerce.department(),
        thumbnails: faker.image.url()
    }
}

export const createFakerUsers = async () => {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({max: 80, min: 18}),
        password: faker.internet.password()
    }
}