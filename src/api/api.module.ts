import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [UserModule, OrganizationModule, MailModule],
    controllers: [],
    providers: []
})
export class ApiModule {}
