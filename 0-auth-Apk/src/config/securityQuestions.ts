export interface RegistrationSecurityQuestion {
  id: string;
  prompt: string;
}

export const REGISTRATION_SECURITY_QUESTIONS: RegistrationSecurityQuestion[] = [
  { id: 'primary_teacher', prompt: '我最深刻的小学老师' },
  { id: 'middle_teacher', prompt: '我最深刻的初中老师' },
  { id: 'alma_mater', prompt: '我的母校' },
  { id: 'birthday', prompt: '我的生日' },
  { id: 'family_address', prompt: '我的家庭地址' },
  { id: 'favorite_food', prompt: '我最喜欢的食物' },
  { id: 'first_trip_city', prompt: '我的第一个旅行地城市' },
  { id: 'parents_met_town', prompt: '父母相遇的乡镇' },
  { id: 'nickname', prompt: '我自己的昵称' },
];
