import IParseMailTemplateDto from '@shared/container/providers/MailtTemplateProvider/dtos/IParseMailTemplateDto';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDto;
}
