import { Controller, Get } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }
}