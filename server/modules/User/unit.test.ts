import { testDouble, expect } from '../../config/tests/config/helpers';
import * as HTTPStatus from 'http-status';
import { User } from './service';


describe('Testes unitários no Service User', () => {
    describe('Create Method', () => {
        it('Should create an User', () => {
            const user = { create: testDouble.function() };
            const requestUser = {
                id: 100,
                name: 'Raphael Lima',
                email: 'raphael@email.com',
                password: '123'
            };
            const expectedResponse = {
                id: 100,
                name: 'Raphael Lima',
                email: 'raphael@email.com',
                password: '123'
            };

            testDouble.when(user.create(requestUser)).thenResolve(expectedResponse);
            const userService = new User();
            return userService
                    .create(requestUser)
                    .then( res => {
                        expect(res.dataValues).to.have.all.keys(
                            ['id', 'name', 'email', 'password', 'createdAt', 'updatedAt']
                        );
                    });
        });
    });
});
