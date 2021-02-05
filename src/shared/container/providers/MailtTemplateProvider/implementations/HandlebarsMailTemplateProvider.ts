import handlebars from 'handlebars';

import IMailTemplateProvider from '@shared/container/providers/MailtTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDto from '@shared/container/providers/MailtTemplateProvider/dtos/IParseMailTemplateDto';
import * as fs from 'fs';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
