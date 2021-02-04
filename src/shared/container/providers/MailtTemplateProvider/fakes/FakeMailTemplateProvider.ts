import IMailTemplateProvider from '@shared/container/providers/MailtTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDto from '@shared/container/providers/MailtTemplateProvider/dtos/IParseMailTemplateDto';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
