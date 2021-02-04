import { container } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/MailtTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailtTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
