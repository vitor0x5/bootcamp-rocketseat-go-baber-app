import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailtTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDto from '@shared/container/providers/MailtTemplateProvider/dtos/IParseMailTemplateDto';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
