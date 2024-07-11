import request from "supertest"
import app  from '../server';
import User from "../database/models/User"
import sequelize from "../database/connection";
import Organization from "../database/models/Organization";

let server: any;

describe("Auth endpoint", () => {

    beforeAll(async () => {
        await sequelize.authenticate(); 
        await sequelize.sync({alter: true});
        server = app.listen(8000, () => {
            console.log(`Test server running on port ${process.env.PORT || 5000}`);
        });
    })

    afterAll(async () => {
        await sequelize.drop();
        await sequelize.close();
        server.close();
    })

    it('register user with default organisation', async () => {
        const newUser = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            password: 'secretpassword',
            phone: '00000',
        };

        const response = await request(app).post('/auth/register').send(newUser)
           
        expect(response.statusCode).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.message).toBe('Registration successful');
        expect(response.body.data.accessToken).toBeDefined();
        expect(response.body.data.user.firstName).toBe(newUser.firstName);
        expect(response.body.data.user.lastName).toBe(newUser.lastName);
        expect(response.body.data.user.email).toBe(newUser.email);

        const user:any = await User.findByPk(response.body.data.user.userId, { include: [Organization] });
        
        // ========== Check if the organization was created correctly ========= //
        const organization = user?.dataValues.Organizations[0];
        expect(organization.name).toBe(`${newUser.firstName}'s Organization`);

    });

    
    it('login with wrong credentials', async () => {
        const user = {email: 'test@gmail,com', password: 'secretsecret'};

        const response = await request(app).post('/auth/login').send(user)
        
        expect(response.statusCode).toBe(401);
        expect(response.body.status).toBe('Bad request');
        expect(response.body.message).toBe('Authentication failed');
    });

    it('duplicate email', async () => {
        const newUser = {
            firstName: 'test',
            lastName: 'test',
            email: 'test@gmail.com',
            password: 'secretpassword',
            phone: '00000',
        };

        const response = await request(app).post('/auth/register').send(newUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Email already exist');
    });

    it('login user', async () => {
        const user = {email: 'test@gmail.com',password: 'secretpassword' };

        const response = await request(app).post('/auth/login').send(user);
        expect(response.statusCode).toBe(200);
        expect(response.body.data.accessToken).toBeDefined();
        expect(response.body.data.user.firstName).toBeDefined();;
        // expect(response.body.data.user.lastName).toBe(newUser.lastName);
    });

})

