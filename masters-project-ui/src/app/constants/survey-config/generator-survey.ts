export const GENERATOR_SURVEY_CONFIG = {
  title: 'CRUD API generator',
  description:
    'Please fill in the survey to get a generated zip file that will contain all the CRUD operations implemented with the desired architecture',
  logoPosition: 'right',
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'text',
          name: 'databaseServer',
          title: "What's your database URL?",
          description: 'Please provide a valid URL of your database. (e.g https://mydatabase)',
          isRequired: true,
          placeholder: 'Database URL'
        },
        {
          type: 'text',
          name: 'databasePort',
          title: "What's your database port?",
          description: 'Please provide a valid port of your database. (e.g 5432)',
          isRequired: true,
          inputType: 'number',
          min: 0,
          max: 65535
        },
        {
          type: 'text',
          name: 'databaseName',
          title: "What's your database name?",
          description: 'Please provide a existing name of your database. (e.g my_database)',
          isRequired: true,
          placeholder: 'Database name'
        },
        {
          type: 'text',
          name: 'databaseUid',
          title: "What's your database username?\n",
          description: 'Please provide a valid username with read rights to your database.',
          isRequired: true,
          placeholder: 'Username'
        },
        {
          type: 'text',
          name: 'databasePwd',
          title: "What's your database password?\n",
          description: 'Please provide a valid password for the previous username with read rights to your database.',
          isRequired: true,
          inputType: 'password',
          placeholder: 'Password'
        },
        {
          type: 'radiogroup',
          name: 'provider',
          title: "What's your database management system?\n",
          description: 'Which of the supported Database Management Systems do you use?',
          isRequired: true,
          choices: [
            {
              value: 'postgres',
              text: 'PostgreSQL'
            },
            {
              value: 'sqlserver',
              text: 'MSSQL (SQLServer)'
            }
          ]
        }
      ],
      title: 'Database information',
      description:
        'In this page we require you to fill out all the necessary data to connect to your database. Only the table information will be read no data will be accessed '
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'text',
          name: 'solutionName',
          title: "What's your desired solution name?\n",
          description: 'The name that will be given to your .NET solution.',
          isRequired: true,
          placeholder: '(e.g FirstSolution)'
        },
        {
          type: 'text',
          name: 'projectName',
          title: "What's your desired project name?",
          description: 'The name that will be given to your .NET project.',
          isRequired: true,
          placeholder: '(e.g FirstProject)'
        },
        {
          type: 'checkbox',
          name: 'architectures',
          title: 'Which architectures do you want your project to implement?\n',
          description: 'Pick one or more of the supported architectures to include in your project',
          isRequired: true,
          choices: [
            {
              value: 'rest',
              text: 'REST'
            },
            {
              value: 'grpc',
              text: 'gRPC'
            }
          ],
          showSelectAllItem: true
        },
        {
          type: 'boolean',
          name: 'cascade',
          title:
            'Do you want your project to implement cascade deletion (might impact performance on entity deletion)?',
          description: 'If one entity is deleted all other connected entities will also be deleted.',
          isRequired: true
        },
        {
          type: 'tagbox',
          name: 'includedTables',
          title: '(Optional) Do you want to include only specific tables?',
          description: 'The presentation layer will only be generated for the chosen tables'
        }
      ],
      title: 'Solution details',
      description: 'In this page we require you to fill out all the necessary data to generate your desired API'
    }
  ],
  widthMode: 'responsive',
  showCompletedPage: false
};
