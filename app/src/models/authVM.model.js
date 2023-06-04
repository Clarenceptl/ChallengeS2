import { object, string, ref } from 'yup'

export const registerSchema = object({
  firstname: string()
    .required('Le champ prénom est requis.')
    .min(3, 'Le prénom doit contenir au moins 3 caractères.')
    .trim()
    .lowercase(),
  lastname: string()
    .required('Le champ nom est requis.')
    .min(3, 'Le nom doit contenir au moins 3 caractères.'),
  email: string().required('Le champ email est requis.').email().trim(),
  birthdate: string().required('Le champ date de naissance est requis.').trim(),
  password: string()
    .required('Le champ mot de passe est requis.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial'
    )
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
    .trim(),
  confirmPassword: string()
    .required('Le champ confiramtion de mot de passe est requis.')
    .oneOf([ref('password'), null], 'Les mots de passe doivent être identiques.')
    .trim()
})
