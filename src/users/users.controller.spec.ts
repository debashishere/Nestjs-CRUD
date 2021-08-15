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
        id,
        ...dto,
      }
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
  })

  it('should update a user', () => {
    const dto = { name: "updated deba" }

    expect(controller.update( '1', dto)).toEqual({
      id: 1,
      ...dto,
    })

    expect(mockUserService.update).toHaveBeenCalled();
  })

});
