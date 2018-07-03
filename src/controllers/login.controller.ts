import {Request, RestBindings} from '@loopback/rest';
import {get, param} from '@loopback/openapi-v3';
import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import { UserRepository} from '../repositories';
import { User } from '../models';
import {
    HttpErrors,
    post,
    requestBody,
} from '@loopback/rest';

/**
 * A simple controller to bounce back http requests
 */
export class LoginController {

  constructor(@repository(LoginRepository.name) private loginRepo: LoginRepository)
   {}
@post('/login')
async loginUser(@requestBody() user: User): Promise<User>{

    if (!user.email || !user.password) {
        throw new HttpErrors.Unauthorized ('invalid credentials');
    
    }
let userExists: boolean = !!(await this.userRepo.count({
    where: {and: [
        {email: user.email},
        {password: user.password},
    
    ],
},
})
    )
}
  
}
