interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER,

  defaults: {
    from: {
      email: 'equipe@gobarber.com',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
