import { post, requestBody, HttpErrors } from "@loopback/rest";
import { userInfo } from "os";
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';



export class RegistationController {
    constructor(
        @repository(UserRepository) protected userRepo: UserRepository,
      ) {}
    
      @post('/registration')
      async registerUser(@requestBody() user: User): Promise<User> {
        // Check that required fields are supplied
        if (!user.email || !user.password) {
          throw new HttpErrors.BadRequest('missing data');
        }
    
        // Check that user does not already exist
        let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));
    
        if (userExists) {
          throw new HttpErrors.BadRequest('user already exists');
        }
    
        return await this.userRepo.create(user);
      }
}