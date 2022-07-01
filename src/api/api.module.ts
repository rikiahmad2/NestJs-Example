import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { MailModule } from './mail/mail.module';
import { ArticleModule } from './article/article.module';

@Module({
    imports: [UserModule, OrganizationModule, MailModule, ArticleModule],
    controllers: [],
    providers: []
})
export class ApiModule {}
