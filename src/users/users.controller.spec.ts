import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  // mock services
  const mockUserService = {

    // simulation of database service
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto,
      }
    }),

    update: jest.fn((id, dto) => {
      return {
        id : '1',
        ...dto,
      }
    }),

    findOne: jest.fn((id) => {
      const user = { name: "deba"}
      return {
        id,
      ...user,
      }
    }),

    findAll: jest.fn(() => {

      const users = [
        {
          id: '1',
          name: 'deba one'
        },
        {
        id: '1',
          name: 'deba one'
        },  
      ]

      return users;
    }),

    remove: jest.fn((id) => {
      return 'ok'
    })

  }

  beforeEach(async () => {

    // simulation of insolated module for one test
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
    // over write UserService dependency 
    .overrideProvider(UsersService)
    .useValue(mockUserService)
    .compile();

    // user controller
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = { name: 'Merius' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name
    })

    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    const dto = { name: "updated deba" }

    expect(controller.update( '1', dto)).toEqual({
      id: '1',
      ...dto,
    })

    expect(mockUserService.update).toHaveBeenCalled();
  });

  it('should get a user by id', () => {
    const id = '1'
    expect(controller.findOne(id)).toEqual({
      id: 1,
      name: "deba"
    })
    expect(mockUserService.findOne).toHaveBeenCalled();
  }),

  it('should get all users', () => {
  
    expect(controller.findAll()).toEqual(
      [
        {
          id: '1',
          name: 'deba one'
        },
        {
        id: '1',
          name: 'deba one'
        },  
      ]
    )
    expect(mockUserService.findAll).toHaveBeenCalled();

  }),

  it('should delete a user by id', () => {
    const id = '1';
    expect(controller.remove(id)).toEqual('ok')
  })


});
