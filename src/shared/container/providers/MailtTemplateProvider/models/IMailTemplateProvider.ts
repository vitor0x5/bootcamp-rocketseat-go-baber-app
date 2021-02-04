import IParseMailTemplateDto from '@shared/container/providers/MailtTemplateProvider/dtos/IParseMailTemplateDto';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDto): Promise<string>;
}
