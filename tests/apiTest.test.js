const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://api.restful-api.dev';

const NEW_OBJECT = {
    name: 'Iphone 15 plus',
    data: {
        color: 'blue',
        price: '1000 USD',
        size: '6.5 inch',
    }
};

const UPDATED_NEW_OBJECT = {
    name: 'Iphone 16 plus',
    data: {
        color: 'red',
        price: '1500 USD',
        size: '6.5 inch',
    }
};

let objectId = '';

const DUMY_OBJECT_ID = '123456789';

test.describe('1 Get All Objects', () => {
    test('Get list of all objects', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/objects`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

});


test.describe('2 Create New Object and retrive by id', () => {

    test.beforeAll('Create a new object', async ({ request }) => {
        // Create an object before running dependent tests
        const response = await request.post(`${BASE_URL}/objects`, {
            data: NEW_OBJECT
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        objectId = responseBody.id;
        console.log(`Object created with ID: ${objectId}`);
    });

    test('Get a single object by ID', async ({ request }) => {
        expect(objectId).not.toBe('');
        console.log(`Fetching object with ID: ${objectId}`);
        const response = await request.get(`${BASE_URL}/objects/${objectId}`);
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.id).toBe(objectId);
        expect(responseBody.name).toBe(NEW_OBJECT.name);
        expect(responseBody.data.color).toBe(NEW_OBJECT.data.color);
        expect(responseBody.data.price).toBe(NEW_OBJECT.data.price);
    });

});

test.describe('3 Create New Object and Update it', () => {

  test.beforeAll('Create a new object', async ({ request }) => {
      // Create an object before running dependent tests
      const response = await request.post(`${BASE_URL}/objects`, {
          data: NEW_OBJECT
      });
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      objectId = responseBody.id;
      console.log(`Object created with ID: ${objectId}`);
  });

  test('Update previously created object', async ({ request }) => {
      const response = await request.put(`${BASE_URL}/objects/${objectId}`,{
          data: UPDATED_NEW_OBJECT
      });
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody.id).toBe(objectId);
      expect(responseBody.name).toBe(UPDATED_NEW_OBJECT.name);
      expect(responseBody.data.color).toBe(UPDATED_NEW_OBJECT.data.color);
      expect(responseBody.data.price).toBe(UPDATED_NEW_OBJECT.data.price);
  });
});

test.describe('4 Create New Object and delete it', () => {

  test.beforeAll('Create a new object', async ({ request }) => {
      // Create an object before running dependent tests
      const response = await request.post(`${BASE_URL}/objects`, {
          data: NEW_OBJECT
      });
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      objectId = responseBody.id;
      console.log(`Object created with ID: ${objectId}`);
  });

  test('Delete previously created object', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${objectId}`);
      const DELETE_MESSAGE = `Object with id = ${objectId} has been deleted.`;
      expect(response.status()).toBe(200);
      const responseBody = await response.json();
      expect(responseBody.message).toBe(DELETE_MESSAGE);
  });

});


test.describe('5 Delete unknown object', () => {

  test('Delete unknown object', async ({ request }) => {
      const response = await request.delete(`${BASE_URL}/objects/${DUMY_OBJECT_ID}`);
      expect(response.status()).toBe(404);     
      const responseBody = await response.json();
  });


});
