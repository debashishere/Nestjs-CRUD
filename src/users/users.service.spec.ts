import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity' ;
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UsersService', () => {

  let service: UsersService;

  // users repo mocks
  const mockUsersRepository = {

    create: jest.fn().mockImplementation((dto) => dto),
    
    save: jest.fn().mockImplementation(user => {
      return Promise.resolve({id: Date.now(), ...user})
    }),

    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        name: 'deba'
      }
    }),

    findOneOrFail: jest.fn().mockImplementation((id) => {
      return {
        id,
        name: "deba"
      }
    }),

    find: jest.fn().mockImplementation(() => {
      const users = [
        {
          id: 1,
          name: 'deba'
        }
      ]

      return users;
    }),

    remove: jest.fn().mockImplementation((user) => {
      return 'ok'
    })


  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        // type of thing we are trying to mock 
        // ( generate a special string teels nest type of repository we are mocking)
        provide: getRepositoryToken(User),
        useValue: mockUsersRepository
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return that', async() => {
    expect(await service.create({name: "deba"})).toEqual({
      id: expect.any(Number),
      name: "deba"
    })
  });

  it('should update a user by id and return that', async() => {
    const updateUserDto = {
      name: 'updated deba',
    }
    expect(await service.update(1, updateUserDto)).toEqual({
      id: expect.any(Number),
      ...updateUserDto,
    })
  })

  it('should update a user by id and return that', async() => {
    const id = 1;
    expect(await service.findOne(id)).toEqual({
      id: expect.any(Number),
      name: 'deba'
    })
  });

  it('should update a user by id and return that', async() => {
    const id = 1;
    expect( service.findAll()).toEqual(
      [
        {
          id: expect.any(Number),
          name: "deba"
          }
      ]
    )
  })

  it('should remove a user by id', async() => {
    const id = 1;
    expect( service.remove(id));
  })
});
