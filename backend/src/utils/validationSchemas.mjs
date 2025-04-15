export const ValidateUser = {
  email: {
    isEmail: {
      errorMessage: "Email inválido",
    },
    isLength: {
      options: {
        min: 5,
        max: 64,
      },
      errorMessage: "O email precisa ter entre 5 e 64 caracteres",
    },
    notEmpty: {
      errorMessage: "O campo Email precisa ser preenchido",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "O campo senha não pode estar vazio",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "A senha precisa ter no mínimo 6 caracteres",
    },
    matches: {
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
      errorMessage:
        "A senha deve conter letra maiúscula, minúscula e caractere especial",
    },
  },
  firstName: {
    isString: {
      errorMessage: "O campo First Name precisa ser texto",
    },
    notEmpty: {
      errorMessage: "O campo First Name precisa ser preenchido",
    },
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "First Name precisa ter entre 3 e 32 caracteres",
    },
  },
  lastName: {
    isString: {
      errorMessage: "O campo Last Name precisa ser texto",
    },
    notEmpty: {
      errorMessage: "O campo Last Name precisa ser preenchido",
    },
    isLength: {
      options: {
        min: 3,
        max: 32,
      },
      errorMessage: "Last Name precisa ter entre 3 e 32 caracteres",
    },
  },
};


export const ValidateTask = {
  titulo: {
    isString: {
      errorMessage: "O Campo Titulo precisa ser texto"
    },
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage: "O Titulo precisa ter entre 5 e 32 caracteres"
    },
    notEmpty: {
      errorMessage: "O Campo Titulo precisa ser preenchido"
    },
  },
  descricao: {
    isString: {
      errorMessage: "O Campo Descrição precisa ser texto"
    },
    notEmpty: {
      errorMessage: "O Campo Descrição precisa ser preenchido"
    },
    isLength: {
      options: {
        min: 5,
        max: 300
      },
      errorMessage: "O Campo Descricao precisa ter entre 5 e 300 caracteres"
    },
  },
  status: {
    isString: {
      errorMessage: "O Campo Status precisa ser texto"
    },
    notEmpty: {
      errorMessage: "O Campo status precisa ser Marcado"
    },
  },
  color: {
    isString: {
      errorMessage: "O Campo color precisa ser texto"
    },
    notEmpty: {
      errorMessage: "O Campo Color precisa ser preenchido"
    },
  },
  x: {
    notEmpty: {
      errorMessage: "O Campo X precisa ser preenchido"
    },
  },
  y: {
    notEmpty: {
      errorMessage: "O Campo Y precisa ser preenchido"
    },
  }


}

export const ValidateBoard = {
  title: {
    isString: {
      errorMessage: "Por favor, preencha o campo título com um texto entre 5 e 50 caracteres."
    },
    isLength: {
      options: {
        min: 5,
        max: 50
      },
      errorMessage: "Por favor, preencha o campo título com um texto entre 5 e 50 caracteres."
    },
    notEmpty: {
      errorMessage: "Por favor, preencha o campo título."
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "O Campo Descrição precisa ser texto"
    },
  },
}

export const ValidateProject = {
  title: {
    isString: {
      errorMessage: "Por favor, preencha o campo título com um texto entre 5 e 50 caracteres."
    },
    isLength: {
      options: {
        min: 5,
        max: 50
      },
      errorMessage: "Por favor, preencha o campo título com um texto entre 5 e 50 caracteres."
    },
    notEmpty: {
      errorMessage: "O Campo Titulo precisa ser preenchido"
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: "O Campo Descrição precisa ser texto"
    },
  },
  status: {
    isString: {
      errorMessage: "O Status precisa ser texto"
    },
    notEmpty: {
      errorMessage: "O Campo status precisa ser Marcado"
    },
  },
  
}